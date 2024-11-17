import { Spacing } from "@layer-ui/spacing";
import { Button } from "@layer-ui/button";

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <div>
        <h1>Title Above</h1>
        <Spacing size={40} title={"test"} style={{ border: "solid" }} />
        <p>This content is vertically spaced by 2rem.</p>
      </div>
    </div>
  );
}

export default App;
