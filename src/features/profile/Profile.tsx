import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Space from "../../common/components/abstract/Space";
import { RootStackParamsList } from "../navigation/Navigator";
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { roundMoney } from "../../common/helpers/roundMoney";
// import { RootStoreType } from "../../redux/rootReducer"
// import { userActions } from "../../redux/slices/exampleSlice"
// import { useDispatch, useSelector } from "react-redux"
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Profile">;
}

// const Redux = () => {
//     const dispatch = useDispatch()
//     const userName = useSelector(
//         (state: RootStoreType) => state.example.name
//     )
//     function onPressExample() {
//         dispatch(userActions.setName("HI"));
//     }
//     return (
//         <TouchableOpacity onPress={() => onPressExample()}><Text style={styles.signOutButtonText}>{userName}</Text></TouchableOpacity>
//     )
// }

const Home = ({ navigation }: Props) => {
  let { signOut, user } = useAuth();
  let focused = useIsFocused();

  useEffect(() => {
    // something();
    PushNotificationIOS.addEventListener("notification", onRemoteNotification);
  }, [focused]);

  const onRemoteNotification = (notification: any) => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
      navigation.navigate("Home");
    } else {
      // Do something else with push notification
    }
  };

  // signs user out of app
  const onPressSignOut = async () => {
    try {
      navigation.navigate("WelcomeView");
      await signOut();
    } catch (error) {
      navigation.navigate("WelcomeView");
      Alert.alert(`Failed to sign out: ${error.message}`);
    }
  };

  // const getMoviesFromApiAsync = async () => {
  //     try {
  //         let response = await fetch(
  //             'http://localhost:3000/'
  //         );
  //         let json = await response.json();
  //         console.log(json);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  async function findCoordinates() {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(async (result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Alert.alert(
              "This feature is not available (on this device / in this context)."
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable."
            );
            break;
          case RESULTS.LIMITED:
            Alert.alert(
              "The permission is limited: some actions are possible."
            );
            break;
          case RESULTS.GRANTED:
            Alert.alert("You are already sharing your location.");
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              "Share Location",
              "This app uses location services to find paying ads in your area.",
              [
                {
                  text: "Allow in settings",
                  onPress: async () => await Linking.openSettings(),
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
            break;
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });

    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: "whenInUse",
    });
    Geolocation.requestAuthorization();
  }

  const notificationPermissions = async () => {
    // async function requestUserPermission() {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //     console.log('Authorization status:', authStatus);
    // }

    // let subscribe = await messaging()
    //     .subscribeToTopic('general')
    //     .then(() => console.log('Subscribed to general topic!'));
    // }
    PushNotificationIOS.checkPermissions(async (permission) => {
      try {
        console.log(permission);
        switch (permission.authorizationStatus) {
          // authorized
          case 2:
            Alert.alert("You have already authorized notifications.");
            break;
          // denied
          case 1:
            Alert.alert(
              "Allow Notifications",
              "This app uses notifications to let you know about new paid offers for you.",
              [
                {
                  text: "Allow in settings",
                  onPress: async () => {
                    await Linking.openSettings();
                    await messaging()
                      .subscribeToTopic("general")
                      .then(() => console.log("Subscribed to general topic!"));
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
            break;
          case undefined:
          case 0:
            await messaging().requestPermission();
            break;
        }
      } catch (error) {
        console.log("Error ", error);
      }
    });
  };

  return (
    <View style={{ justifyContent: "center" }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Space.V s={20} />
        <View style={styles.innerContainer}>
          <Text
            style={{ alignSelf: "center", fontWeight: "700", fontSize: 22 }}
          >
            Settings
          </Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.title}>Balance:</Text>
            {user && (
              <Text style={styles.title}>
                ${roundMoney(user.customData.balance)}
              </Text>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.title}>Total Earnings:</Text>
            {user && (
              <Text style={styles.title}>
                ${roundMoney(user.customData.totalEarnings)}
              </Text>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <TouchableOpacity onPress={() => findCoordinates()}>
              <Text style={styles.locationButtonText}>
                Allow Location Services
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <TouchableOpacity onPress={() => notificationPermissions()}>
              <Text style={styles.locationButtonText}>
                Allow Notification Services
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => onPressSignOut()}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {/* <Button onPress={() => PushNotificationIOS.addNotificationRequest({ id: "testNotification", title: "Test Title", subtitle: "Test Subtitle", body: "Test Body", fireDate: new Date(Date.now() + (10 * 1000)) })} title="Notify" /> */}
      </ScrollView>
      {/* <Button onPress={() => getMoviesFromApiAsync()} title="API" />
            <Space.V s={20} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    width,
    height,
  },
  innerContainer: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: width - 80,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  settings: {
    width,
    marginHorizontal: 20,
    alignItems: "flex-end",
  },
  locationButtonText: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
    color: "#FF5A5F",
  },
  signOutButtonText: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
    color: "black",
  },
  circle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  selectedCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    backgroundColor: "orange",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  genderOptionText: {
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 5,
  },
  hello: {
    borderRadius: 20,
    width: 300,
    height: 500,
    backgroundColor: "white",
  },
  date: {
    zIndex: 10,
  },
  dateView: {
    alignItems: "center",
    justifyContent: "center",
  },
  birthDateText: {
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Home;
