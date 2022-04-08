import { ThemeProvider } from "react-native-elements";
import { Provider } from "react-redux";
import theme from "./presentation/layout/theme";
import { store } from "./redux/store";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import ScreenContainer from "./presentation/components/ScreenContainer/ScreenContainer";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', 
  "Can't perform a React state update on an unmounted component",
  "Failed prop type: Invalid prop `defaultValue` of type `string` supplied to `TextInput`, expected `number`.",
])
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <ScreenContainer />
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
