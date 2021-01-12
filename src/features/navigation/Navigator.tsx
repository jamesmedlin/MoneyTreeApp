import SplashScreen from "react-native-bootsplash"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { Provider } from 'react-redux';
import {
  isMountedRef,
  navigationRef,
} from "../../services/navigation/navigationService"
import Profile from "../profile/Profile"
import Explore from "../explore/Explore"
import OnboardingIntro from "../onboardingIntro/OnboardingIntro"
import OnboardingGuide from "../onboardingGuide/OnboardingGuide"
import OnboardingLocation from "../onboardingLocation/OnboardingLocation"
import TransferMoney from "../transferMoney/TransferMoney"
import SavedVideos from "../savedVideos/SavedVideos"
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
  OnboardingIntro: undefined
  OnboardingGuide: undefined
  OnboardingLocation: undefined
  TransferMoney: undefined
  SavedVideos: undefined
}

const Stack = createStackNavigator<RootStackParamsList>();
const Tab = createBottomTabNavigator();

export function HomeStackScreen() {
  return (<Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} options={{
      headerLeft: null,
      headerTitleStyle: {
        color: '#FF5A5F'
      },
    }} />
    <Stack.Screen name="Profile" component={Profile} options={{
      headerTitleStyle: { color: '#FF5A5F' },
      headerTintColor: "#FF5A5F"
    }} />
    <Stack.Screen name="TransferMoney" component={TransferMoney} options={{
      headerTitleStyle: { color: '#FF5A5F' },
      headerTintColor: "#FF5A5F",
      title: "Transfer Money"
    }} />
    <Stack.Screen name="SavedVideos" component={SavedVideos} options={{
      headerTitleStyle: {
        color: '#FF5A5F'
      },
      headerTintColor: "#FF5A5F",
      title: "Saved Videos"
    }} />
  </Stack.Navigator>)
}

export function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{
      labelStyle: {
        fontSize: 16,
        fontWeight: "700"
      }, activeTintColor: "#FF5A5F"
    }} >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerBackTitleVisible: false }} />
      <Stack.Screen name="Explore" component={Explore} />
    </ Tab.Navigator >
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
            <Stack.Screen name="WelcomeView" component={WelcomeView} options={{ headerShown: false }} />
            <Stack.Screen name="OnboardingIntro" component={OnboardingIntro} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="OnboardingGuide" component={OnboardingGuide} options={{ headerShown: false }} />
            <Stack.Screen name="OnboardingLocation" component={OnboardingLocation} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={TabNavigator} options={{ headerShown: false, gestureEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  )
}

export default Navigator
