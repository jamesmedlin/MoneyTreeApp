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

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Profile">
}

const Home = ({ navigation }: Props) => {
    let { signOut, user } = useAuth();
    function goGetStarted() { navigation.navigate("WelcomeView") }
    let focused = useIsFocused();

    useEffect(() => {
    }, [focused])

    const onPressSignOut = async () => {
        try {
            goGetStarted();
            await signOut();
        } catch (error) {
            goGetStarted();
            Alert.alert(`Failed to sign out: ${error.message}`);
        }
    };

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={20} />
                    <Text style={styles.title}>My Profile</Text>
                    <Space.V s={10} />
                    {user && <Text style={styles.title}>Balance: ${user.customData.balance}</Text>}
                    <Space.V s={10} />
                    <Button onPress={() => onPressSignOut()} title="Sign Out" />
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
