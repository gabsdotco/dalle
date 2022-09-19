import { styled } from "@/theme";

export const Input = styled("input", {
  width: "100%",
  height: "40px",
  paddingInline: "$md",
  paddingBlock: "$lg",
  border: "1px solid $gray-300",
  fontFamily: "$body",

  "&:focus": {
    transitionDuration: "0.2s",
    border: "1px solid $gray-500"
  },

  "&::placeholder": {
    color: "$gray-500"
  }
});
