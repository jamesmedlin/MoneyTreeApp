import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Space from "../../common/components/abstract/Space";
import { RootStackParamsList } from "../navigation/Navigator";
import { useAuth } from "../../providers/AuthProvider";
import Geolocation from "@react-native-community/geolocation";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "Home">;
}

const OnboardingLocation = ({ navigation }: Props) => {
  let { signOut, user } = useAuth();

  useEffect(() => {});

  // navigates user to profile
  async function goHome() {
    navigation.navigate("Home");
    console.log(await user.functions.userOnboarded());
    await user.refreshCustomData();
  }

  function findCoordinates() {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: "whenInUse",
    });
    Geolocation.requestAuthorization();
  }

  return (
    <View style={styles.onboardingContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.subtitle}>Want all possible offers?</Text>
        <Space.V s={7} />
        <Text style={styles.bodyText}>
          Allow us to confidentially use your location to send you local paid
          advertisements.
        </Text>
        <Space.V s={20} />
        <Text style={styles.subtitle}>Our Promise:</Text>
        <Space.V s={7} />
        <Text style={styles.bodyText}>
          Your location is not shared with anyone. EVER.
        </Text>
        <Space.V s={20} />
        <TouchableOpacity
          onPress={() => {
            findCoordinates();
            goHome();
          }}
          style={styles.locationButton}
        >
          <Text style={styles.buttonText}>Share Location</Text>
        </TouchableOpacity>
        <Space.V s={15} />
        <Text style={styles.bodyText}>
          Without your location, we will not be able to send you the most paid
          offers possible.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    width,
    height,
  },
  onboardingContainer: {
    width,
    height,
  },
  innerContainer: {
    marginHorizontal: 12,
    alignItems: "center",
    marginTop: height * 0.3,
    flex: 1,
    paddingHorizontal: 20,
  },
  nextButton: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#3d4849",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonContainer: {
    width,
    alignItems: "flex-end",
    marginBottom: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  subtitle: {
    color: "#FF5A5F",
    fontSize: 24,
    fontWeight: "600",
  },
  bodyText: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  locationButton: {
    height: 50,
    width: 200,
    backgroundColor: "#3d4849",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#FF5A5F",
  },
});

export default OnboardingLocation;
