import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import { RootStackParamsList } from "../navigation/Navigator"
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';


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
                    <Text style={styles.bodyText}>When interested, click each video to visit its website.</Text>
                    <Space.V s={3} />
                    <Text style={styles.subtitle}>Our Promise:</Text>
                    <Space.V s={7} />
                    <Text style={styles.bodyText}>Your personal information is not shared with anyone. EVER.</Text>
                </View>
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => goOnboardingPersonalInfo()} style={styles.nextButton}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
            </View>
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
})

export default OnboardingGuide
