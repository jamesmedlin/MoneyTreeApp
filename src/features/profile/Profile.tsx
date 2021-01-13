import { StackNavigationProp } from "@react-navigation/stack"
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
// import { RootStoreType } from "../../redux/rootReducer"
// import { userActions } from "../../redux/slices/exampleSlice"
// import { useDispatch, useSelector } from "react-redux";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Profile">
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

    return (
        <View style={{ justifyContent: "center", }}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <Space.V s={20} />
                <View style={styles.innerContainer}>
                    <Text style={{ alignSelf: "center", fontWeight: "700", fontSize: 22 }}>Settings</Text>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.title}>Balance:</Text>
                        {user && <Text style={styles.title}>${roundMoney(user.customData.balance)}</Text>}
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.title}>Total Earnings:</Text>
                        {user && <Text style={styles.title}>${roundMoney(user.customData.totalEarnings)}</Text>}
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => findCoordinates()}><Text style={styles.locationButtonText}>Allow Location Services</Text></TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => onPressSignOut()}><Text style={styles.signOutButtonText}>Sign Out</Text></TouchableOpacity>
                </View>
            </ScrollView>
            {/* <Button onPress={() => getMoviesFromApiAsync()} title="API" />
            <Space.V s={20} /> */}
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
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: "#C4C4C4",
        borderRadius: 20
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
        alignSelf: "center"
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
