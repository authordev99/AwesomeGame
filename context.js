import { createContext, useMemo, useState } from "react";

export const ContextState = createContext(null);

function Provider({ children }) {
  const [state, setState] = useState({});
  const value = useMemo(
    () => ({ state, setState }),
    [state]
  );
  return (
    <ContextState.Provider value={value}>
        {children}
    </ContextState.Provider>
  );
}

export default Provider;
