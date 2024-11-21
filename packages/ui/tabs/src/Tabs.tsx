import { composeEventHandlers } from "@layer-core/primitive";
import { createContext } from "@layer-lib/react-context";
import { HTMLAttributes, useState } from "react";

interface TabsContextType {
  value?: string;
  defaultValue?: string;
  onValueChange: (val: string) => void;
}

const [TabsProvider, useTabsContext] = createContext<TabsContextType>();

interface TabsProps extends React.PropsWithChildren {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = ({ defaultValue, onValueChange, children }: TabsProps) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsProvider defaultValue={defaultValue} value={value} onValueChange={composeEventHandlers(onValueChange, setValue)}>
      {children}
    </TabsProvider>
  );
};

type TabsListProps = HTMLAttributes<HTMLDivElement>;

const TabsList = ({ children, ...props }: TabsListProps) => {
  return (
    <div role="tablist" aria-label="tabs-navigation" {...props}>
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

  return (
    <button
      id={`tab-${value}`}
      role="tab"
      aria-controls={`tabpanel-${value}`}
      aria-selected={context.value === value}
      data-state={isSelected ? "active" : "inactive"}
      onClick={composeEventHandlers(props.onClick, () => context.onValueChange(value))}
      onKeyDown={composeEventHandlers(props.onKeyDown, (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          context.onValueChange(value);
        }
      })}
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
    <div id={`tabpanel-${value}`} role="tabpanel" aria-labelledby={`tab-${value}`} hidden={!isSelected} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
