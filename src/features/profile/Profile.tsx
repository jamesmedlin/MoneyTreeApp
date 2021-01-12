import { StackNavigationProp } from "@react-navigation/stack"
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Alert,
    TouchableOpacity,
    Linking
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import { RootStackParamsList } from "../navigation/Navigator"
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { roundMoney } from "../../common/helpers/roundMoney"
import { RootStoreType } from "../../redux/rootReducer"
import { userActions } from "../../redux/slices/exampleSlice"
import { useDispatch, useSelector } from "react-redux";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Profile">
}

const Redux = () => {
    const dispatch = useDispatch()
    const userName = useSelector(
        (state: RootStoreType) => state.example.name
    )
    function onPressExample() {
        dispatch(userActions.setName("HI"));
    }
    return (
        <TouchableOpacity onPress={() => onPressExample()}><Text style={styles.signOutButtonText}>{userName}</Text></TouchableOpacity>
    )
}

const Gender = () => {
    let [selectedGender, setGender] = useState("");
    return (
        <View>
            {selectedGender != "" && <Text>{selectedGender}</Text>}
            <View style={{alignItems: "center"}}>
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

const Age = () => {
    let [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setBirthDate(currentDate);
    };

    return (
        <DateTimePicker
            value={birthDate}
            mode="date"
            display="spinner"
            maximumDate={new Date(2012, 0, 1)}
            minimumDate={new Date(1920, 0, 1)}
            onChange={onChange}
        />
    )
}

const Home = ({ navigation }: Props) => {
    let { signOut, user } = useAuth();
    let focused = useIsFocused();
    let [show, setShow] = useState(false);

    useEffect(() => {
    }, [focused])

    // signs user out of app
    const onPressSignOut = async () => {
        try {
            navigation.navigate("WelcomeView")
            await signOut();
        } catch (error) {
            navigation.navigate("WelcomeView")
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
                        Alert.alert('This feature is not available (on this device / in this context).');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable.');
                        break;
                    case RESULTS.LIMITED:
                        Alert.alert('The permission is limited: some actions are possible.');
                        break;
                    case RESULTS.GRANTED:
                        Alert.alert('You are already sharing your location.');
                        break;
                    case RESULTS.BLOCKED:
                        Alert.alert(
                            'Share Location',
                            'This app uses location services to find paying ads in your area.',
                            [
                                {
                                    text: 'Allow in settings',
                                    onPress: async () => await Linking.openSettings()
                                },
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel'
                                }
                            ],
                            { cancelable: false }
                        );
                        break;
                }
            })
            .catch((error) => {
                console.log("Error", error);
            });

        Geolocation.setRNConfiguration({ skipPermissionRequests: false, authorizationLevel: "whenInUse" });
        Geolocation.requestAuthorization();
    };

    let [birthDate, setBirthDate] = useState(new Date(2000, 0, 1));

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setBirthDate(currentDate);
    };

    return (
        <View style={{ justifyContent: "center", }}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={20} />
                    {user && <Text style={styles.title}>Balance: ${roundMoney(user.customData.balance)}</Text>}
                    <Space.V s={10} />
                    {user && <Text style={styles.title}>Total Earnings: ${roundMoney(user.customData.totalEarnings)}</Text>}
                    <Space.V s={10} />
                    {/* <Button onPress={() => getMoviesFromApiAsync()} title="API" />
                    <Space.V s={20} /> */}
                    <View style={styles.settings}>
                        <TouchableOpacity onPress={() => findCoordinates()}><Text style={styles.locationButtonText}>Allow Location Services</Text></TouchableOpacity>
                    </View>
                    <Space.V s={10} />
                    <Space.V s={10} />
                    <Gender />
                    <Space.V s={20} />
                    <TouchableOpacity onPress={() => onPressSignOut()}><Text style={styles.signOutButtonText}>Sign Out</Text></TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.birthDateText}>Birthday</Text>
                        <Text style={styles.birthDateText}>{birthDate.toDateString()}</Text>
                    </View>
                    <Button title="Set Birthday" onPress={() => setShow(!show)} />
                    {show && <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="spinner"
                        maximumDate={new Date(2008, 0, 1)}
                        minimumDate={new Date(1920, 0, 1)}
                        onChange={onChange}
                        style={styles.date}
                    />}
                    {show && <Button title="Done" onPress={() => setShow(!show)} />}
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
        width,
        height,
    },
    innerContainer: {
        // paddingHorizontal: 20,
        // alignItems: "center",
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 20,
        marginLeft: 20,
        fontWeight: "700",
    },
    settings: {
        width,
        paddingHorizontal: 20,
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
        alignItems: 'center',
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
        backgroundColor: "white"
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
    }
})

export default Home
