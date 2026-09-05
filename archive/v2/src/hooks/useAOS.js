import { useEffect } from 'react';
import { initAOS, refreshAOS } from '../lib/animations';

/** Mount AOS once on the client and refresh when dependencies change. */
export function useAOS(deps = []) {
  useEffect(() => {
    initAOS();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refreshAOS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
