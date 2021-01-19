import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Button
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import { RootStackParamsList } from "../navigation/Navigator"
import { useIsFocused } from '@react-navigation/native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const OnboardingGuide = ({ navigation }: Props) => {
    // determines if this screen is currently being watched
    let focused = useIsFocused();

    useEffect(() => {
    }, [focused])

    // navigates user to profile
    function goOnboardingPersonalInfo() {
        navigation.navigate("OnboardingPersonalInfo")
    };

    return (
        <View style={styles.onboardingContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.innerContent}>
                    <Text style={styles.title}>How it works:</Text>
                    <Space.V s={10} />
                    <Text style={styles.bodyText}>Help us notify you when you have paid offers!</Text>
                    <Space.V s={15} />
                    <TouchableOpacity onPress={() => {
                        PushNotificationIOS.requestPermissions();
                        goOnboardingPersonalInfo();
                    }} style={styles.notificationButton}><Text style={styles.buttonText}>Set Notifications</Text></TouchableOpacity>
                    <Space.V s={20} />
                    <Text style={styles.subtitle}>Our Promise:</Text>
                    <Space.V s={7} />
                    <Text style={styles.bodyText}>We will not spam or overload you with notifications.</Text>
                </View>
            </View>
            {/* <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => goOnboardingPersonalInfo()} style={styles.nextButton}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View> */}
        </View>
    )
}


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
        marginTop: height * .3,
        flex: 1,
        paddingHorizontal: 20,
    },
    innerContent: {
        alignItems: "center",
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
        color: "#FF5A5F",
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
        alignSelf: "flex-start"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#FF5A5F",
    },
    notificationButton: {
        height: 50,
        width: 200,
        backgroundColor: "#3d4849",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
})

export default OnboardingGuide
