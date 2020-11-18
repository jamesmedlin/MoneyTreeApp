import SplashScreen from "react-native-bootsplash"
import { NavigationContainer, TabActions } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect } from "react"
import {
  isMountedRef,
  navigationRef,
} from "../../services/navigation/navigationService"
import Home from "../home/Home"
import Landing from "../landing/Landing"
import Categories from "../categories/Categories"
import Profile from "../profile/Profile"
import kPlans from "../kPlans/kPlans"
import EmergencyAccount from "../emergencyAccount/EmergencyAccount"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export type RootStackParamsList = {
  Home: undefined
  Landing: undefined
  Categories: undefined
  Profile: undefined
  kPlans: undefined
  EmergencyAccount: undefined
}

const Stack = createStackNavigator<RootStackParamsList>();
const Tab = createBottomTabNavigator();

export function ProfileStackScreen() {
  return (<Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="kPlans" component={kPlans} />
    <Stack.Screen name="EmergencyAccount" component={EmergencyAccount} />
  </Stack.Navigator>)
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
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator initialRouteName="Profile">
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        <Stack.Screen name="Categories" component={Categories} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
