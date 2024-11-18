import { createContext } from "@layer-lib/react-context";
import { useState } from "react";

interface TabsContextType {
  defaultValue: string;
  value?: string;
  onValueChange: (val: string) => void;
}

const [TabsProvider, useTabsContext] = createContext<TabsContextType>();

interface TabsProps extends React.PropsWithChildren, TabsContextType {}

const Tabs = ({ defaultValue, onValueChange, children }: TabsProps) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsProvider
      defaultValue={defaultValue}
      value={value}
      onValueChange={(value: string) => {
        onValueChange(value);
        setValue(value);
      }}
    >
      {children}
    </TabsProvider>
  );
};

interface TabsListProps extends React.PropsWithChildren {}

const TabsList = ({ children }: TabsListProps) => {
  return <div>{children}</div>;
};

interface TabsTriggerProps extends React.PropsWithChildren {
  value: string;
}

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const context = useTabsContext();

  const isSelected = context.value === value;
  return (
    <button role="tab" data-state={isSelected ? "active" : "inactive"} onClick={() => context.onValueChange(value)}>
      {children}
    </button>
  );
};

interface TabsContentProps extends React.PropsWithChildren {
  value: string;
}

const TabsContent = ({ value, children }: TabsContentProps) => {
  const context = useTabsContext();
  if (context.value !== value) {
    return;
  }

  return <div>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
