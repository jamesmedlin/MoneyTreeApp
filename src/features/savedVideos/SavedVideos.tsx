import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import { RootStackParamsList } from "../navigation/Navigator"
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';
import StatusBox from "../../common/components/StatusBox"

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "SavedVideos">
    route: RouteProp<RootStackParamsList, 'SavedVideos'>
}

const SavedVideos = ({ route, navigation }: Props) => {
    let { user } = useAuth();
    let [startedChecking, setStartedChecking] = useState(false);
    let [checkedSaved, setCheckedSaved] = useState(false);
    let isFocused = useIsFocused();
    let [savedAds, setSavedAds] = useState([])

    useEffect(() => {
        if (!checkedSaved && isFocused && !startedChecking) {
            mapSavedVideos();
        }
    })

    const mapSavedVideos = async () => {
        setStartedChecking(true)
        await user.refreshCustomData();
        if (user.customData.savedAds.length != 0) {
            let result = await user.functions.getSavedAdsFull(user.customData.savedAds);
            setSavedAds(result);
        } else {
        }
        setCheckedSaved(true);
    }

    function renderSavedVideos() {
        if (savedAds.length != 0) {
            return (
                <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                    {savedAds.map((ad: any) => {
                        return (<View key={ad.name} style={{ marginHorizontal: 10, marginBottom: 20 }}>
                            <StatusBox text={ad.name} />
                        </View>)
                    })}
                </View>
            )
        } else {
            return (<View style={{width: width - 24, alignItems: "center" }}><Text style={styles.text}>Save videos that interest you in the explore section.</Text></View>)
        }
    }

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={10} />
                    {startedChecking && !checkedSaved && <ActivityIndicator size="small" />}
                    <Space.V s={10} />
                    <View style={styles.blah}>
                        {checkedSaved && renderSavedVideos()}
                    </View>
                </View>
            </ScrollView>
        </View >
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
        justifyContent: "center"
    },
    blah: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    text: {
        alignSelf: "flex-start",
        fontSize: 14,
        // marginLeft: 20,
        fontWeight: "600",
        color: "grey"
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

export default SavedVideos
