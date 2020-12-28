import SplashScreen from "react-native-bootsplash"
import { NavigationContainer, TabActions } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { Provider } from 'react-redux';
import {
  isMountedRef,
  navigationRef,
} from "../../services/navigation/navigationService"
import Profile from "../profile/Profile"
import Landing from "../landing/Landing"
import Explore from "../explore/Explore"
import Home from "../home/Home"
import { WelcomeView } from "../welcome/WelcomeView"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from "../../providers/AuthProvider";
import store from "../../redux/store"

export type RootStackParamsList = {
  Profile: undefined
  Landing: undefined
  Explore: undefined
  Home: undefined
  WelcomeView: undefined
}

const Stack = createStackNavigator<RootStackParamsList>();
const Tab = createBottomTabNavigator();

export function HomeStackScreen() {
  return (<Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} options={{ headerLeft: null }} />
    <Stack.Screen name="Profile" component={Profile} />
    {/* <Stack.Screen name="Landing" component={Landing} /> */}
  </Stack.Navigator>)
}

export function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
  )
}

function Navigator() {
  /**
   * Hide the splash screen on mount
   * Keep track of nav container mounts for usage of {@link NavigationService}
   */
  useEffect(() => {
    isMountedRef.current = true
    SplashScreen.hide({ duration: 250 })
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return (
    <AuthProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="WelcomeView">
            <Stack.Screen name="WelcomeView" component={WelcomeView} />
            <Tab.Screen name="Home" component={TabNavigator} options={{ headerShown: false, gestureEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  )
}

export default Navigator
