import * as React from "react";

function createContext<ContextType extends object | null>(defaultValue?: ContextType) {
  const Context = React.createContext<ContextType | undefined>(defaultValue);

  function Provider(props: ContextType & { children: React.ReactNode }) {
    const { children, ...context } = props;
    const values = React.useMemo(() => context, [Object.values(context)]) as ContextType;

    return <Context.Provider value={values}> {children} </Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultValue) return defaultValue;
    throw new Error("useContext must be inside a Provider with a value");
  }

  return [Provider, useContext] as const;
}

export { createContext };
