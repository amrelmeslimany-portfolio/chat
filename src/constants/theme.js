import { theme } from "antd";

export const PRIMARY_COLOR = "#6B8afd";
export const LIGHTEN_PRIMARY_COLOR = "#dbe3ff";

export const BLACK_DARK = "#131313";
export const LIGHTEN_BLACK_DARK = "#1b1e25";
export const WHITE = "#ffffff";

// Light theme
export const LIGHT_PRIMARY = "#f0f2ff";

// Text's colors
export const GRAY_TEXT = "#adb2bf";
// ANTD Token
export const CUSTOM_THEME = (darkMode) => ({
  token: {
    fontFamily: "Archivo",
    colorPrimary: PRIMARY_COLOR,
    colorBgLayout: darkMode ? BLACK_DARK : WHITE,
    controlItemBgActive: PRIMARY_COLOR,
    colorBgContainer: darkMode ? LIGHTEN_BLACK_DARK : LIGHT_PRIMARY,
    colorBgSpotlight: BLACK_DARK,
    borderRadius: 8,
    marginLG: 15,
    // colorBorder: "transparent",
    lineHeightHeading5: 1.1,
    lineHeightHeading4: 1.1,
    lineHeight: 1.1,
    colorTextHeading: darkMode && "white",
    colorSplit: "#adb2bf35",
  },
  components: {
    Menu: {
      itemHoverBg: PRIMARY_COLOR,
      itemHoverColor: WHITE,
      itemSelectedColor: WHITE,
      itemMarginBlock: 15,
      itemColor: GRAY_TEXT,
      darkItemColor: "gray",
    },
    Avatar: {
      containerSizeLG: 55,
    },
    List: {
      avatarMarginRight: 10,
    },
    Statistic: {
      contentFontSize: 18,
    },
    Segmented: {
      itemSelectedBg: PRIMARY_COLOR,
    },
    Modal: {
      contentBg: darkMode ? LIGHTEN_BLACK_DARK : LIGHT_PRIMARY,
    },
  },
  algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
});
