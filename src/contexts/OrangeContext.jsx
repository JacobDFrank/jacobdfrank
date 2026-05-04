/**
 * OrangeContext
 *
 * Shares two refs across the orange component tree:
 *   orangeRef    — the orange globe DOM element (set by OrangeGlobe on mount)
 *   isSettledRef — true when the orange is at rest on the floor (set by OrangeEffects)
 *
 * OrangeGlobe reads isSettledRef to stop auto-rotation when settled.
 * OrangeEffects sets isSettledRef based on physics state.
 */

import React, { createContext, useContext, useRef } from 'react';

const OrangeContext = createContext({
  orangeRef:    { current: null  },
  isSettledRef: { current: false },
});

export const OrangeProvider = ({ children }) => {
  const orangeRef    = useRef(null);
  const isSettledRef = useRef(false);
  return (
    <OrangeContext.Provider value={{ orangeRef, isSettledRef }}>
      {children}
    </OrangeContext.Provider>
  );
};

export const useOrangeMode = () => useContext(OrangeContext);

export default OrangeContext;
