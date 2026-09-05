/**
 * 3D assets for the lab. Author in Blender, export as glTF Binary (.glb) with Draco or meshopt
 * compression, drop the file in `public/models/`, and reference it here. When `src` is absent the
 * stage renders a procedural stand-in so the pipeline is visible before the first asset ships.
 */
export interface StudioModel {
  name: string;
  /** Public path to a .glb; omit to use the procedural placeholder. */
  src?: string;
  /** Applied after loading so any Blender export lands at a sensible size. */
  scale: number;
  description: string;
  pipeline: string[];
}

export const studioModel: StudioModel = {
  name: 'Graphite monolith',
  scale: 1,
  description:
    'Procedural stand-in rendered with a clearcoat physical material. Blender-authored glTF assets load through the same stage.',
  pipeline: ['Blender', 'glTF / GLB', 'Draco', 'React Three Fiber', 'PBR materials'],
};
