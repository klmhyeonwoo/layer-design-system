import { composeEventHandlers } from "@layer-core/primitive";
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

type TabsListProps = HTMLAttributes<HTMLDivElement>;

const TabsList = ({ children, ...props }: TabsListProps) => {
  return (
    <div aria-label="tabs-navigation" {...props}>
      {children}
    </div>
  );
};

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = ({ value, children, ...props }: TabsTriggerProps) => {
  const context = useTabsContext();
  const isSelected = context.value === value;
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      context.onValueChange?.(value);
    }
  };
  return (
    <button
      role="tab"
      aria-controls={value}
      aria-selected={context.value === value}
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => context.onValueChange(value)}
      onKeyDown={composeEventHandlers(handleKeyDown, props.onKeyDown ?? (() => {}))}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = ({ value, children, ...props }: TabsContentProps) => {
  const context = useTabsContext();
  const isSelected = context.value === value;

  return (
    <div aria-labelledby={`panel-${value}`} hidden={!isSelected} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
