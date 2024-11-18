import { Button } from "@layer-ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@layer-ui/tabs";
import { tabsListStyle, tabsTriggerStyle } from "./styles/tabs.css";
import "./styles/app.css";

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Tabs defaultValue={"foo"} onValueChange={(va) => console.log(va)}>
        <TabsList className={tabsListStyle}>
          <TabsTrigger className={tabsTriggerStyle} value={"foo"}>
            foo
          </TabsTrigger>
          <TabsTrigger className={tabsTriggerStyle} value={"bar"}>
            bar
          </TabsTrigger>
        </TabsList>
        <TabsContent value={"foo"}>foo</TabsContent>
        <TabsContent value={"bar"}>bar</TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
