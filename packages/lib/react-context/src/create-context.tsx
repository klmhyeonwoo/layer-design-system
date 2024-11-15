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
    throw new Error(`Context 값을 찾을 수 없습니다. useContext는 반드시 해당하는 Provider 내부에서 사용되어야 합니다.`);
  }

  return [Provider, useContext] as const;
}

export { createContext };
