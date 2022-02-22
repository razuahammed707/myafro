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
import Tabs from "./presentation/components/Tabs/Tabs";

export default function App() {
  let [fontsLoaded, error] = useFonts({
    regular: Nunito_400Regular,
    semiBold: Nunito_600SemiBold,
    bold: Nunito_700Bold,
    extraBold: Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
