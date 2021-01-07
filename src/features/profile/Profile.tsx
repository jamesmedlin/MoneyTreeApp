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

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Profile">
}

const Home = ({ navigation }: Props) => {
    let { signOut, user } = useAuth();
    let focused = useIsFocused();
    let [location, setLocation] = useState("")

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


        // 
        Geolocation.setRNConfiguration({ skipPermissionRequests: false, authorizationLevel: "whenInUse" });
        Geolocation.requestAuthorization();
    };

    return (
        <View>
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
                    <TouchableOpacity onPress={() => onPressSignOut()}><Text style={styles.signOutButtonText}>Sign Out</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
        width,
    },
    innerContainer: {
        marginHorizontal: 12,
        alignItems: "center",
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
    }
})

export default Home
