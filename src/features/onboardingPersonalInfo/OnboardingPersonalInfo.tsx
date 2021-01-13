import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import {
    ScrollView,
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
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const OnboardingPersonalInfo = ({ navigation }: Props) => {
    let { signOut, user } = useAuth();
    // determines if this screen is currently being watched
    let focused = useIsFocused();
    let [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));
    let [birthDateChanged, setBirthDateChanged] = useState(false);
    let [selectedGender, setGender] = useState("");

    useEffect(() => {
    }, [focused])

    const Gender = () => {
        return (
            <View>
                <View style={{ alignItems: "center" }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={styles.genderOption} onPress={() => setGender("Male")} >
                            {selectedGender == "Male" ? <View style={styles.selectedCircle} />
                                : <View style={styles.circle} />}
                            <Text style={styles.genderOptionText}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.genderOption} onPress={() => setGender("Female")} >
                            {selectedGender == "Female" ? <View style={styles.selectedCircle} />
                                : <View style={styles.circle} />}
                            <Text style={styles.genderOptionText}>Female</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.genderOption} onPress={() => setGender("Other")} >
                            {selectedGender == "Other" ? <View style={styles.selectedCircle} />
                                : <View style={styles.circle} />}
                            <Text style={styles.genderOptionText}>Other</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // navigates user to profile
    async function goOnboardingLocation() {
        navigation.navigate("OnboardingLocation");
        // dob: birthDate.toDateString(),
        let obj = {};
        if (birthDateChanged) {
            let obj = {
                "gender": selectedGender,
                "dob": birthDate
            }
            await user.functions.setPersonalInfo(obj)
        } else {
            let obj = {
                "gender": selectedGender
            }
            await user.functions.setPersonalInfo(obj)
        }
    };

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setBirthDate(currentDate);
        setBirthDateChanged(true);
    };

    return (
        <View style={styles.onboardingContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.innerContent}>
                    <Text style={styles.subtitle}>Access more paid videos</Text>
                    <Space.V s={10} />
                    <Text style={styles.bodyText}>See videos that target your gender:</Text>
                </View>
                <Space.V s={7} />
                <Gender />
                <Space.V s={7} />
                <View style={styles.innerContent}>
                    <Text style={styles.bodyText}>See videos that target your age:</Text>
                </View>
                <Space.V s={3} />
                <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date(2008, 0, 1)}
                    minimumDate={new Date(1920, 0, 1)}
                    onChange={onChange}
                    style={styles.date}
                />
                <Space.V s={7} />
                <View style={styles.innerContent}>
                    <Text style={styles.subtitle}>Our Promise:</Text>
                    <Space.V s={7} />
                    <Text style={styles.bodyText}>Your personal information is not shared with anyone. EVER.</Text>
                </View>
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
    nextButtonInteracted: {
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
        backgroundColor: "#FF5A5F",
    },
    genderOption: {
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: 8,
    },
    genderOptionText: {
        fontWeight: "500",
        fontSize: 18,
        marginLeft: 5,
    },
    date: {
    }
})

export default OnboardingPersonalInfo
