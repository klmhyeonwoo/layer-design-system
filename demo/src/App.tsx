import { Button } from "@layer-ui/button";
import { useSpacing } from "@layer-lib/use-spacing";

function App() {
  const spacing = useSpacing({ size: 10, direction: "vertical" });

  return (
    <div>
      <Button>Click me</Button>
      <div>
        <h1>Title Above</h1>
        <div style={{ ...spacing }}> This is 10px Spacing </div>
        <p>This content is vertically spaced.</p>
      </div>
    </div>
  );
}

export default App;
