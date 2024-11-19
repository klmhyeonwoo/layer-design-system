type Direction = "all" | "horizontal" | "vertical" | "top" | "bottom" | "left" | "right";

type Unit = "px" | "rem" | "em" | "%";

type SpacingOptions = {
  size: number | "small" | "medium" | "large";
  direction: Direction;
  unit?: Unit;
};

const sizeMap = {
  small: 4,
  medium: 8,
  large: 16,
};

/**
 * @description useSpacing is a library that makes the user's spacing style more efficient.
 * @param { Object } options
 * @param { number | "small" | "medium" | "large" } options.size
 * @param { "all" | "horizontal" | "vertical" | "top" | "bottom" | "left" | "right" } options.direction
 * @param { "px" | "rem" | "em" | "%" } [options.unit="px"]
 * @returns { Object }
 * */
export const useSpacing = ({ size, direction, unit = "px" }: SpacingOptions) => {
  const spacingValue = typeof size === "number" ? size : sizeMap[size];

  const styles = (() => {
    const valueWithUnit = `${spacingValue}${unit}`;
    switch (direction) {
      case "all":
        return { margin: valueWithUnit };
      case "horizontal":
        return { marginLeft: valueWithUnit, marginRight: valueWithUnit };
      case "vertical":
        return { marginTop: valueWithUnit, marginBottom: valueWithUnit };
      case "top":
        return { marginTop: valueWithUnit };
      case "bottom":
        return { marginBottom: valueWithUnit };
      case "left":
        return { marginLeft: valueWithUnit };
      case "right":
        return { marginRight: valueWithUnit };
      default:
        return {};
    }
  })();

  return styles;
};
