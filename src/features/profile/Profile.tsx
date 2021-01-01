import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    Alert
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import { RootStackParamsList } from "../navigation/Navigator"
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

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

    function findCoordinates() {
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
                    {user && <Text style={styles.title}>Balance: ${user.customData.balance}</Text>}
                    <Space.V s={10} />
                    {user && <Text style={styles.title}>Total Earnings: ${user.customData.totalEarnings}</Text>}
                    <Space.V s={10} />
                    {/* <Button onPress={() => getMoviesFromApiAsync()} title="API" />
                    <Space.V s={20} /> */}
                    <Button onPress={() => findCoordinates()} title="Share My Location" />
                    <Space.V s={10} />
                    <Button onPress={() => onPressSignOut()} title="Sign Out" />
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
    header: {
        alignSelf: "flex-start",
        fontSize: 20,
    },
    profilePicture: {
        alignSelf: 'flex-end',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#c4c4c4',
        marginRight: 30,
    },
    tile: {
        width,
        paddingHorizontal: 30
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 20,
        marginLeft: 20,
        fontWeight: "700",
    },
    todoitemcontainer: {
        width,
        paddingHorizontal: 30,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    creditScore: {
        alignSelf: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '900',
        color: 'grey',
    },
})

export default Home
