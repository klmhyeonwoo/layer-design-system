import { Spacing } from "./Spacing";

export default { title: "Utilities/Spacing" };

export const VerticalSpacing = () => (
  <div>
    <h1>Vertical Spacing</h1>
    <Spacing size={20} direction="vertical" style={{ border: "solid" }} />
    <p>This content is vertically spaced by 20px.</p>
  </div>
);

export const HorizontalSpacing = () => (
  <div>
    <h1>Horizontal Spacing</h1>
    <Spacing size={200} direction="horizontal" style={{ border: "solid" }} />
    <p>This content is horizontally spaced by 200px.</p>
  </div>
);

export const DynamicSpacing = () => (
  <div>
    <h1>Dynamic Spacing</h1>
    <Spacing size={30} direction="vertical" style={{ border: "solid" }} />
    <p>This content is vertically spaced by 30px.</p>
    <Spacing size={400} direction="horizontal" style={{ border: "solid" }} />
    <p>This content is horizontally spaced by 400px.</p>
  </div>
);
