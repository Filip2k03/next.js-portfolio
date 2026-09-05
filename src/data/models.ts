/**
 * 3D assets for the lab, authored in Blender by `tools/blender/build_assets.py` and exported as
 * glTF Binary into `public/models/`. Rebuild with:
 *
 *   blender -b --python tools/blender/build_assets.py -- public/models
 *
 * Any hand-authored .glb can be added the same way; the stage normalises size and centring.
 */
export interface StudioModel {
  slug: string;
  name: string;
  /** Public path to the .glb. */
  src: string;
  description: string;
  /** Longest dimension after normalisation, in scene units. */
  fit: number;
}

export const studioModels: StudioModel[] = [
  {
    slug: 'monolith',
    name: 'Graphite monolith',
    src: '/models/monolith.glb',
    fit: 2.3,
    description:
      'Ten-sided column with four boolean-cut slots, hardened bevels, a champagne inlay ring and an emissive cap slit.',
  },
  {
    slug: 'compute-module',
    name: 'Compute module',
    src: '/models/compute-module.glb',
    fit: 2.4,
    description: 'Chassis with a fourteen-fin heat sink, processor package, marking rail and four lit ports.',
  },
  {
    slug: 'soc',
    name: 'System-on-chip',
    src: '/models/soc.glb',
    fit: 2.1,
    description: 'Chamfered package, exposed die, trace ring with alternating lit lanes and a 10 × 10 pin grid.',
  },
];

export const assetPipeline = ['Blender 5 (bpy)', 'glTF / GLB', 'React Three Fiber', 'PBR materials', 'Emissive accents'];
