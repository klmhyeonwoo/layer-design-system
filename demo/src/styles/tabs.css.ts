import { style } from "@vanilla-extract/css";

export const tabsStyle = style({});

export const tabsListStyle = style({
  display: "flex",
  gap: "1.2rem",
});

export const tabsTriggerStyle = style({
  fontSize: "1.8rem",
  fontWeight: "600",
  padding: ".8rem",
  background: "none",
  border: "none",
  selectors: {
    '&[data-state="active"]': {
      color: "#212329",
      borderBottom: ".2rem solid",
    },
    '&[data-state="inactive"]': {
      color: "#A9AFBB",
      borderBottom: ".2rem solid transparent",
    },
  },
});
