export interface TechnologyGroup { name: string; level: string; items: string[]; }
export const technologies: TechnologyGroup[] = [
 {name:'Languages',level:'Listed in the existing portfolio',items:['JavaScript','TypeScript','Python','PHP']},
 {name:'Frontend',level:'Listed experience / this implementation',items:['React','Next.js','Tailwind CSS']},
 {name:'Backend',level:'Listed in the existing portfolio',items:['Node.js','Django','Laravel']},
 {name:'Data & infrastructure',level:'Listed experience / this implementation',items:['MySQL','Docker','Nginx','Git','CI/CD']},
 {name:'Spatial interfaces',level:'Demonstrated in this portfolio',items:['Three.js','React Three Fiber','WebGL 2','GLSL shaders','InstancedMesh','PBR materials','glTF pipeline']},
 {name:'AI & automation',level:'Listed in the existing portfolio',items:['AI integrations','ML pipelines','Workflow automation']},
 {name:'Systems research',level:'Areas of interest · depth not yet documented',items:['C','C++','Go','Assembly','x86_64','ARM64','RISC-V','RTOS','Memory management','OS bring-up','Microkernel concepts','Embedded / SoC']},
 {name:'Extended technology map',level:'Owner-requested scope · project evidence pending',items:['PostgreSQL','MongoDB','Redis','Linux','GitLab CI/CD','Self-hosted infrastructure','Vite','Electron','Django REST Framework','React Native','Expo','MediaPipe','Blender','LLM applications','AI tooling']},
];
