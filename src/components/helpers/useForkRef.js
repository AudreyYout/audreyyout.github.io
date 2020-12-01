import { useMemo } from 'react';

/**
 * @param ref The ref to set with the value.
 * @param value The value to set to the ref.
 */
export const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};

export const useForkRef = (refA, refB) => (
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB])
);
