import { Button } from "@layer-ui/button";
import { getSpacingStyle } from "@layer-utils/getSpacingStyle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@layer-ui/tabs";
import { tabsListStyle, tabsTriggerStyle } from "./styles/tabs.css";
import "./styles/app.css";

function App() {
  const spacingStyle = getSpacingStyle({ size: 50, direction: "vertical" });

  return (
    <div>
      <Button>Click me</Button>
      <div>
        <h1>Title Above</h1>
        <div style={spacingStyle}> This is 10px Spacing </div>
        <p>This content is vertically spaced.</p>
      </div>
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
