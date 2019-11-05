import { Platform } from "react-native";
import Colors from "./Colors";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const Global = {
  body: {
    fontFamily: 'Trebuchet MS',
    backgroundColor: 'transparent',
    fontSize: 16,
    color: Colors.primary
  },
  wrapper: {
    marginTop: getStatusBarHeight(), // Fix fullscreen (non-Header)
    flex: 1,
    background: Colors.white,
  },
};

export default {
  Global,
}
