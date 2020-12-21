import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
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
import StatusBox from "../../common/components/StatusBox"
import { RootStackParamsList } from "../navigation/Navigator"
import ProgressCircle from 'react-native-progress-circle'
import { useAuth } from "../../providers/AuthProvider";
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../redux/slices/exampleSlice"
import { RootStoreType } from "../../redux/rootReducer"


enum progress { hasNotStarted, inProgress, complete }

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Profile">
}

const Profile = ({ navigation }: Props) => {
    const { signOut, user } = useAuth();
    function goGetStarted() { navigation.navigate("WelcomeView") }
    const dispatch = useDispatch()
    if (user) {
        dispatch(userActions.set(user.customData))
        const globalValue = useSelector(
            (state: RootStoreType) => state.userInfo.globalValue
        )
        console.log("SET", globalValue)
    }

    async function onPressSignOut() {
        try {
            goGetStarted();
            await signOut();
        } catch (error) {
            goGetStarted();
            Alert.alert(`Failed to sign out: ${error.message}`);
        }
    };

    const onPressSeeData = async () => {
        try {
            const data = await user.refreshCustomData();
            console.log(data);
        } catch (error) {
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
                    <Button onPress={onPressSeeData} title="See Data" />
                    <Space.V s={20} />
                    <View style={styles.profilePicture}></View>
                    <Space.V s={10} />
                    <Space.V s={10} />
                    <Text style={styles.title}>Hello!</Text>
                    <Space.V s={10} />
                    <View style={styles.todoitemcontainer}>
                        <StatusBox text="Emergency Acc." goTo="EmergencyAccount" status={progress.hasNotStarted} />
                        <StatusBox text="Credit Score">
                            <View style={styles.creditScore}>
                                <ProgressCircle
                                    percent={100 * 440 / 550}
                                    radius={50}
                                    borderWidth={15}
                                    color="#90EE90"
                                    shadowColor="white"
                                    bgColor="white"><Text style={styles.text}>740</Text></ProgressCircle>
                            </View>
                        </StatusBox>
                        <StatusBox text="Insurance" status={progress.hasNotStarted} />
                        <StatusBox text="Retirement" goTo="kPlans" status={progress.hasNotStarted} />
                        <StatusBox text="Savings Acc." status={progress.hasNotStarted} />
                    </View>
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

export default Profile
