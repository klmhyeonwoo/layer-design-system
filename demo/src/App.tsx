import { Button } from "@layer-ui/button";
import { getSpacingStyle } from "@layer-utils/getSpacingStyle";

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
    </div>
  );
}

export default App;
