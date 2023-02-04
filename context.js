import { createContext, useState } from "react";

export const ContextState = createContext(null);

function Provider({ children }) {
  const setUser = (user) => {
    setState({...state, user: user})
  }

  const resetUser = () => {
    setState(initState)
  }

  const initState = {
    user: null,
    setUser: setUser,
    resetUser: resetUser,
  }


  const [state, setState] = useState(initState)

  return (
    <ContextState.Provider value={state}>
        {children}
    </ContextState.Provider>
  );
}

export default Provider;
