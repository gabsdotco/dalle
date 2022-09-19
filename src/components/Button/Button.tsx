import { styled } from "@/theme";

export const Button = styled("button", {
  color: "white",
  border: "1px solid $gray-300",
  padding: "$md",
  fontWeight: "600",
  fontFamily: "$body",
  backgroundColor: "$gray-900",

  "&:hover": {
    backgroundColor: "$gray-800",
    transitionDuration: "0.1s"
  },

  variants: {
    secondary: {
      true: {
        backgroundColor: "white",
        color: "$gray-900",

        "&:hover": {
          backgroundColor: "$gray-900",
          transitionDuration: "0.1s",
          color: "white"
        }
      }
    },

    disabled: {
      true: {
        color: "$gray-100",
        cursor: "not-allowed",
        border: "none",
        backgroundColor: "$gray-500",

        "&:hover": {
          backgroundColor: "$gray-600",
          transitionDuration: "0.1s"
        }
      }
    }
  },

  compoundVariants: [
    {
      secondary: true,
      disabled: true,
      css: {
        color: "$gray-600",
        backgroundColor: "$gray-200",

        "&:hover": {
          color: "$gray-600",
          backgroundColor: "$gray-200",
          transitionDuration: "0.1s"
        }
      }
    }
  ]
});
