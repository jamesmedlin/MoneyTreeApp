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
    let { signOut, user } = useAuth();
    // determines if this screen is currently being watched
    let focused = useIsFocused();

    useEffect(() => {
    }, [focused])

    // navigates user to profile
    const onPressGoProfile = async () => {
        navigation.navigate("Profile")
    };

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
                    <View style={styles.topContainer}>
                        <View style={styles.profileContainer}>
                            <View style={styles.profilePicture}></View>
                            <Space.V s={3} />
                            <TouchableOpacity onPress={() => onPressGoProfile()} style={styles.profileButton}><Text style={styles.profileButtonText}>Profile</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Space.V s={20} />
                    {user &&
                        <View style={styles.homeContentContainer}>
                            <Tile text={`Transfer balance: $${roundMoney(user.customData.balance)}`} isCheckable={false} goTo={"TransferMoney"} />
                            <Space.V s={7} />
                        </View>
                    }
                    <Space.V s={20} />
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
    topContainer: {
        alignSelf: 'flex-end',
        paddingRight: 30,
    },
    profileContainer: {
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
