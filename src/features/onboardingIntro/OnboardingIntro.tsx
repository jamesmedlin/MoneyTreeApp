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
    function goOnboardingGuide() {
        navigation.navigate("OnboardingGuide")
    };

    return (
        <View style={styles.onboardingContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Welcome!</Text>
                <Space.V s={10} />
                <Text style={styles.bodyText}>Earn $15/hour watching videos.</Text>
                <Space.V s={3} />
                <Text style={styles.bodyText}>It's simple! Watch the ad, answer a question, get paid!</Text>
                <Space.V s={20} />
                <Text style={styles.bodyText}>Earn an extra $0.50 for every referral you make!</Text>
                <Space.V s={20} />
            </View>
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={() => goOnboardingGuide()} style={styles.nextButton}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
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
        fontSize: 36,
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
