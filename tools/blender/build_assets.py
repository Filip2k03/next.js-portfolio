"""
Authors the lab's 3D assets in Blender and exports them as glTF Binary.

    blender -b --python tools/blender/build_assets.py -- public/models

Everything is procedural bpy so the assets are reproducible from source; the exported .glb files
are what the site loads (`src/data/models.ts`). Units: metres, Y-up on export, centred at the
origin, roughly 2.2 units tall so every model shares one camera.
"""

import math
import os
import sys

import bpy

GRAPHITE = (0.055, 0.062, 0.07)
GRAPHITE_LIGHT = (0.10, 0.11, 0.125)
CHAMPAGNE = (0.72, 0.58, 0.36)
DIE = (0.02, 0.022, 0.026)


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def material(name, color, metallic, roughness, emission=None, strength=2.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    return m


def smooth(obj):
    for p in obj.data.polygons:
        p.use_smooth = True


def bevel(obj, width=0.02, segments=3):
    mod = obj.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(40)
    mod.harden_normals = True
    return mod


def apply_all(obj):
    bpy.context.view_layer.objects.active = obj
    for mod in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)


def cut(obj, cutter):
    mod = obj.modifiers.new("Cut", "BOOLEAN")
    mod.operation = "DIFFERENCE"
    mod.object = cutter
    apply_all(obj)
    bpy.data.objects.remove(cutter, do_unlink=True)


def cube(name, size, location, mat):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(mat)
    return obj


def cylinder(name, radius, depth, location, mat, vertices=64):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(mat)
    return obj


def torus(name, major, minor, location, mat):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, location=location, major_segments=96, minor_segments=16)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(mat)
    smooth(obj)
    return obj


def export(path):
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_texcoords=False,
        export_normals=True,
        export_materials="EXPORT",
    )
    print(f"wrote {path} ({os.path.getsize(path) // 1024} KB)")


# --------------------------------------------------------------------------------------------
# 01 Graphite monolith: ten-sided column, four recessed slots, champagne inlay ring, lit cap slit
# --------------------------------------------------------------------------------------------
def monolith():
    reset()
    graphite = material("Graphite", GRAPHITE, 0.85, 0.32)
    champagne = material("Champagne", CHAMPAGNE, 1.0, 0.18)
    glow = material("Glow", CHAMPAGNE, 0.2, 0.3, emission=CHAMPAGNE)

    body = cylinder("Monolith", 0.5, 2.0, (0, 0, 0.1), graphite, vertices=10)
    for i in range(4):
        a = i * math.pi / 2 + math.pi / 4
        slot = cube("Slot", (0.06, 0.16, 1.2), (math.cos(a) * 0.5, math.sin(a) * 0.5, 0.15), graphite)
        slot.rotation_euler[2] = a
        bpy.ops.object.transform_apply(rotation=True)
        cut(body, slot)
    bevel(body, 0.03, 4)
    apply_all(body)

    base = cylinder("Base", 0.66, 0.16, (0, 0, -0.98), graphite, vertices=10)
    bevel(base, 0.02, 3)
    apply_all(base)

    torus("Inlay", 0.6, 0.012, (0, 0, -0.89), champagne)
    slit = cube("Slit", (0.62, 0.03, 0.02), (0, 0, 1.11), glow)
    smooth(slit)


# --------------------------------------------------------------------------------------------
# 02 Compute module: chassis with heat-sink fins, processor, four lit ports
# --------------------------------------------------------------------------------------------
def compute_module():
    reset()
    graphite = material("Graphite", GRAPHITE, 0.85, 0.3)
    light = material("GraphiteLight", GRAPHITE_LIGHT, 0.9, 0.22)
    die = material("Die", DIE, 0.6, 0.12)
    glow = material("Glow", CHAMPAGNE, 0.2, 0.3, emission=CHAMPAGNE)
    champagne = material("Champagne", CHAMPAGNE, 1.0, 0.18)

    chassis = cube("Chassis", (2.0, 1.2, 0.22), (0, 0, -0.4), graphite)
    bevel(chassis, 0.025, 4)
    apply_all(chassis)

    fin = cube("Fin", (0.045, 0.7, 0.42), (-0.55, 0.05, -0.08), light)
    arr = fin.modifiers.new("Fins", "ARRAY")
    arr.count = 14
    arr.relative_offset_displace = (1.9, 0, 0)
    bevel(fin, 0.006, 2)
    apply_all(fin)

    proc = cube("Processor", (0.52, 0.52, 0.06), (0.0, -0.42, -0.26), die)
    bevel(proc, 0.01, 3)
    apply_all(proc)
    cube("Marking", (0.3, 0.012, 0.004), (0.0, -0.25, -0.228), champagne)

    for i in range(4):
        cube("Port", (0.12, 0.05, 0.05), (-0.75 + i * 0.22, -0.62, -0.36), glow)

    rail = cube("Rail", (2.04, 0.02, 0.02), (0, 0.61, -0.29), champagne)
    smooth(rail)


# --------------------------------------------------------------------------------------------
# 03 System-on-chip: chamfered package, exposed die, pin grid, champagne trace ring
# --------------------------------------------------------------------------------------------
def soc():
    reset()
    package = material("Package", GRAPHITE_LIGHT, 0.4, 0.45)
    die = material("Die", DIE, 0.7, 0.1)
    pin = material("Pin", CHAMPAGNE, 1.0, 0.25)
    champagne = material("Champagne", CHAMPAGNE, 1.0, 0.18)
    glow = material("Glow", CHAMPAGNE, 0.2, 0.3, emission=CHAMPAGNE, strength=1.2)

    body = cube("Package", (1.5, 1.5, 0.14), (0, 0, -0.25), package)
    bevel(body, 0.04, 2)
    apply_all(body)

    core = cube("Die", (0.72, 0.72, 0.05), (0, 0, -0.16), die)
    bevel(core, 0.008, 2)
    apply_all(core)

    frame = cube("Trace", (0.86, 0.86, 0.006), (0, 0, -0.178), champagne)
    hole = cube("TraceHole", (0.8, 0.8, 0.02), (0, 0, -0.178), champagne)
    cut(frame, hole)

    for i in range(6):
        y = -0.6 + i * 0.24
        cube("Lane", (0.26, 0.012, 0.004), (-0.6, y, -0.178), glow if i % 2 else champagne)
        cube("Lane", (0.26, 0.012, 0.004), (0.6, y, -0.178), glow if i % 2 else champagne)

    p = cylinder("Pin", 0.028, 0.16, (-0.63, -0.63, -0.4), pin, vertices=12)
    ax = p.modifiers.new("PinsX", "ARRAY")
    ax.count = 10
    ax.relative_offset_displace = (2.5, 0, 0)
    ay = p.modifiers.new("PinsY", "ARRAY")
    ay.count = 10
    ay.relative_offset_displace = (0, 2.5, 0)
    apply_all(p)
    smooth(p)


BUILDS = {
    "monolith": monolith,
    "compute-module": compute_module,
    "soc": soc,
}


def main():
    out_dir = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "public/models"
    os.makedirs(out_dir, exist_ok=True)
    for name, build in BUILDS.items():
        build()
        export(os.path.join(out_dir, f"{name}.glb"))


main()
