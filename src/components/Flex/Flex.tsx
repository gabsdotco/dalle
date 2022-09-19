import { styled } from "@/theme";

export const Flex = styled("div", {
  display: "flex",

  variants: {
    direction: {
      row: {
        flexDirection: "row"
      },
      column: {
        flexDirection: "column"
      }
    },

    justify: {
      start: {
        justifyContent: "flex-start"
      },
      end: {
        justifyContent: "flex-end"
      },
      center: {
        justifyContent: "center"
      },
      between: {
        justifyContent: "space-between"
      },
      around: {
        justifyContent: "space-around"
      }
    },

    align: {
      start: {
        alignItems: "flex-start"
      },
      end: {
        alignItems: "flex-end"
      },
      center: {
        alignItems: "center"
      },
      stretch: {
        alignItems: "stretch"
      }
    },

    wrap: {
      wrap: {
        flexWrap: "wrap"
      },
      nowrap: {
        flexWrap: "nowrap"
      }
    }
  }
});
