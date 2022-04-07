import React, { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  getTokenValue,
} from "../../../redux/slices/login/authSlice";
import AppNavigator from "../../screenTypes/AppNavigator";
import AuthNavigator from "../../screenTypes/AuthNavigator";

const ScreenContainer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(authSelector);

  // get token to make sure the user is authenticated or not
  const getToken = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user_info");
      if (userInfo) {
        const parsedToken = JSON.parse(userInfo);
        dispatch(getTokenValue(parsedToken?.access_token));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getToken();
  }, []);
  const { data } = useSelector(authSelector);

  return token === null && !data.access_token ? (
    <AuthNavigator />
  ) : (
    <AppNavigator data={data} />
  );
};

export default ScreenContainer;
