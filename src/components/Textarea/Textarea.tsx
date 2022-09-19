import { styled } from "@/theme";

export const Textarea = styled("textarea", {
  width: "100%",
  height: "40px",
  paddingInline: "$md",
  paddingBlock: "$lg",
  border: "1px solid $gray-300",
  transitionDuration: "0.2s",
  fontFamily: "$body",

  "&:focus": {
    border: "1px solid $gray-500"
  },

  "&::placeholder": {
    color: "$gray-500"
  }
});
