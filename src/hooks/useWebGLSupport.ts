'use client';
import { useSyncExternalStore } from 'react';

let probed: boolean | null = null;

// Probe once per page load; the result never changes for the session.
function probe(): boolean {
  if (probed === null) {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext();
    probed = Boolean(gl);
  }
  return probed;
}

const subscribe = () => () => {};

/** `null` during SSR/hydration so the first paint never assumes WebGL support. */
export function useWebGLSupport(): boolean | null {
  return useSyncExternalStore(subscribe, probe, () => null);
}
