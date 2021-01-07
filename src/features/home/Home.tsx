import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect } from "react"
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
import { TouchableOpacity } from "react-native-gesture-handler"
import Tile from "../../common/components/Tile"
import { roundMoney } from "../../common/helpers/roundMoney"

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Home">
}

const Home = ({ navigation }: Props) => {
    let { user } = useAuth();
    // determines if this screen is currently being watched
    let focused = useIsFocused();

    useEffect(() => {
    }, [focused])

    // navigates user to profile
    const onPressGoProfile = async () => {
        navigation.navigate("Profile")
    };

    // async function mapSavedVideos() {
    //     await user.refreshCustomData();
    //     if (user.customData.savedAds.length != 0) {
    //         let result = await user.functions.getSavedAdsFull(user.customData.savedAds);
    //         navigation.navigate("SavedVideos", { pass: result })
    //     } else {
    //         console.log("You have no saved videos");
    //         navigation.navigate("SavedVideos", { pass: [] })
    //     }
    // }

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={20} />
                    <Text style={styles.title}>Hello!</Text>
                    <Space.V s={10} />
                    <View style={styles.profileContainer}>
                        <View style={styles.profilePicture}></View>
                        <Space.V s={3} />
                        <TouchableOpacity onPress={() => onPressGoProfile()} style={styles.profileButton}><Text style={styles.profileButtonText}>Profile</Text></TouchableOpacity>
                    </View>
                    <Space.V s={30} />
                    {user &&
                        <View style={styles.homeContentContainer}>
                            <Tile text={`Transfer balance: $${roundMoney(user.customData.balance)}`} isCheckable={false} goTo={"TransferMoney"} />
                            <Space.V s={10} />
                            <Tile text={`My saved videos`} isCheckable={false} goTo={"SavedVideos"} />
                            <Space.V s={7} />
                        </View>
                    }
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
        marginHorizontal: 12,
        alignItems: "center",
    },
    profileContainer: {
        alignSelf: 'flex-end',
        marginRight: 25,
        flexDirection: "column",
        justifyContent: "center",
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#c4c4c4',
    },
    homeContentContainer: {
        width: width - 60,
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 20,
        marginLeft: 20,
        fontWeight: "700",
    },
    profileButton: {
        width: 50,
        alignSelf: "center",
    },
    profileButtonText: {
        fontWeight: "600",
        fontSize: 16,
        alignSelf: "center",
        color: "#FF5A5F",
    }
})

export default Home
