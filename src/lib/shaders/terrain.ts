/**
 * Displaced wireframe terrain. The height field runs in the vertex stage so the CPU never
 * touches the position buffer; the fragment stage fades lines by height and distance.
 */
export const terrainVertex = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vDepth;

  float field(vec2 p, float t) {
    return sin(p.x * 0.9 + t) * 0.35
         + cos(p.y * 1.3 - t * 0.7) * 0.28
         + sin((p.x + p.y) * 0.5 + t * 0.4) * 0.22;
  }

  void main() {
    vec3 p = position;
    p.z = field(p.xy, uTime);
    vHeight = p.z;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

export const terrainFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorHigh;
  uniform float uOpacity;
  varying float vHeight;
  varying float vDepth;

  void main() {
    float h = smoothstep(-0.6, 0.7, vHeight);
    float fade = 1.0 - smoothstep(4.0, 11.0, vDepth);
    gl_FragColor = vec4(mix(uColor, uColorHigh, h), uOpacity * (0.35 + 0.65 * fade));
  }
`;
