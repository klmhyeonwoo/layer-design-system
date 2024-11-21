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
} as const;

const directionStyles = {
  all: ["margin"],
  horizontal: ["marginLeft", "marginRight"],
  vertical: ["marginTop", "marginBottom"],
  top: ["marginTop"],
  bottom: ["marginBottom"],
  left: ["marginLeft"],
  right: ["marginRight"],
} as const;

/**
 * @description useSpacing is a library that makes the user's spacing style more efficient.
 * @param { Object } options
 * @param { number | "small" | "medium" | "large" } options.size
 * @param { "all" | "horizontal" | "vertical" | "top" | "bottom" | "left" | "right" } options.direction
 * @param { "px" | "rem" | "em" | "%" } [options.unit="px"]
 * @returns { Record<string, string | number> }
 */
export const getSpacingStyle = ({ size, direction, unit = "px" }: SpacingOptions): Record<string, string | number> => {
  const spacingValue = typeof size === "number" ? size : sizeMap[size];
  const valueWithUnit = `${spacingValue}${unit}`;

  return directionStyles[direction].reduce((acc, cur) => ({ ...acc, [cur]: valueWithUnit }), {});
};
