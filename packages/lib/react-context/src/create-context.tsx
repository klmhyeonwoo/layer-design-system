import * as React from "react";

function createContext<ContextType extends object | null>(contextName: string, defaultValue?: ContextType) {
  const Context = React.createContext<ContextType | undefined>(defaultValue);

  function Provider(props: ContextType & { children: React.ReactNode }) {
    const { children, ...context } = props;
    const values = React.useMemo(() => context, [Object.values(context)]) as ContextType;

    return <Context.Provider value={values}> {children} </Context.Provider>;
  }

  function useContext(componentName: string) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultValue) return defaultValue;
    throw new Error(
      `${contextName}Context 값을 찾을 수 없습니다. <${componentName} />에서 사용된 ${contextName}context는 반드시 해당하는 ${contextName}Provider 내부에서 사용되어야 합니다.`,
    );
  }

  return [Provider, useContext] as const;
}

export { createContext };
