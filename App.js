import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
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
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./presentation/screens/Login/Login";
import Signup from "./presentation/screens/Signup/Signup";
import ForgotPassword from "./presentation/screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./presentation/screens/ResetPassword/ResetPassword";
import Home from "./presentation/screens/Home/Home";
import OneTimePass from "./presentation/screens/OneTimePass/OneTimePass";
import Onboard from "./presentation/screens/Onboard/Onboard";

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
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Onboard"
                component={Onboard}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="OTP"
                component={OneTimePass}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </SafeAreaProvider>
        </ThemeProvider>
      </NavigationContainer>
    </Provider>
  );
}
