import { createContext } from "@layer-lib/react-context";
import { HTMLAttributes, useState } from "react";

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

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

const TabsList = ({ children, ...props }: TabsListProps) => {
  return <div {...props}>{children}</div>;
};

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = ({ value, children, ...props }: TabsTriggerProps) => {
  const context = useTabsContext();

  const isSelected = context.value === value;
  return (
    <button role="tab" data-state={isSelected ? "active" : "inactive"} onClick={() => context.onValueChange(value)} {...props}>
      {children}
    </button>
  );
};

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = ({ value, children, ...props }: TabsContentProps) => {
  const context = useTabsContext();
  if (context.value !== value) {
    return;
  }

  return <div {...props}>{children}</div>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
