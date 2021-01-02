import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
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

const OnboardingIntro = ({ navigation }: Props) => {
    let { signOut, user } = useAuth();
    // determines if this screen is currently being watched
    let focused = useIsFocused();

    useEffect(() => {
    }, [focused])

    // navigates user to profile
    function goOnboardingLocation() {
        navigation.navigate("OnboardingLocation")
    };

    return (
        <View style={styles.onboardingContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>How it works:</Text>
                <Space.V s={10} />
                <Text style={styles.bodyText}>It's simple! Watch the ad, answer a question, get paid!</Text>
                <Space.V s={5} />
                <Text style={styles.bodyText}>Relevent advertisement videos are waiting for your attention.</Text>
                <Space.V s={5} />
                <Text style={styles.bodyText}>If you're interested in the ad, click the video to visit its website.</Text>
                <Space.V s={20} />
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => goOnboardingLocation()} style={styles.nextButton}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
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
        alignItems: "center",
        marginTop: height * .3,
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
        color: "#FF5A5F",
        fontSize: 30,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 20,
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

export default OnboardingIntro
