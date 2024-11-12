import { keyframes, style } from "@vanilla-extract/css";

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const animation = style({
  animation: `${fadeIn} 0.2s ease-out forwards`,
  selectors: {
    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.2s ease-out forwards`,
    },
  },
});

export const modalStyle = style([
  animation,
  {
    position: "fixed",
    display: "table",
    margin: "auto",
    width: "100%",
    height: "fit-content",
    maxWidth: "46rem",
    maxHeight: "46rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "0.4s all",
    padding: "2rem",
  },
]);

export const modalContentStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  borderRadius: "1.2rem",
  padding: "2.5rem 2rem",
  rowGap: "2rem",
  boxSizing: "border-box",
  textAlign: "center",
});

export const overlayStyle = style([
  animation,
  {
    position: "fixed",
    backgroundColor: "rgba(0,0,0,0.4)",
    pointerEvents: "auto",
    inset: 0,
  },
]);
