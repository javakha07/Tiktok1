import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.white,
    fontSize: 16,

    //fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
