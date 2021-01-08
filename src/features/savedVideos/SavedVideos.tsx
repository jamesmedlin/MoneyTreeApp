import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    Modal,
    TouchableOpacity
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import { RootStackParamsList } from "../navigation/Navigator"
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';
import StatusBox from "../../common/components/StatusBox";
import { WebView } from "react-native-webview";

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
    let [webpage, setWebpage] = useState(false);
    let [selectedAd, setSelectedAd] = useState(null);
    let [unsaveLoading, setUnsaveLoading] = useState(false);

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

    async function unsaveAd(ad: any) {
        setUnsaveLoading(true)
        await user.functions.saveOrUnsaveAd(ad._id);
        await user.refreshCustomData();
        let result = await user.functions.getSavedAdsFull(user.customData.savedAds);
        setSavedAds(result);
        setUnsaveLoading(false);
    }

    function renderSavedVideos() {
        if (savedAds.length != 0) {
            return (
                <View style={{ flexDirection: "row", flexWrap: "wrap", }}>
                    {savedAds.map((ad: any) => {
                        return (
                            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                                <TouchableOpacity onPress={() => {
                                    setSelectedAd(ad)
                                    setWebpage(true)
                                }}>
                                    <View style={styles.unsaveContainer}>
                                        <TouchableOpacity style={styles.unsave} onPress={() => unsaveAd(ad)}><Text style={styles.unsaveText}>Unsave</Text></TouchableOpacity>
                                    </View>
                                    <View key={ad.name} style={{ marginBottom: -10, }}>
                                        <StatusBox text={ad.name} />
                                    </View>
                                </TouchableOpacity>
                            </View>)
                    })}
                </View>
            )
        } else {
            return (<View style={{ width: width - 24, alignItems: "center" }}><Text style={styles.text}>Save videos that interest you in the explore section.</Text></View>)
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
                    {(startedChecking && !checkedSaved) || unsaveLoading ? <ActivityIndicator size="small" /> : null}
                    <Space.V s={10} />
                    <View style={styles.blah}>
                        {checkedSaved && renderSavedVideos()}
                    </View>
                </View>
                {webpage && selectedAd &&
                    <Modal animationType='slide' presentationStyle="pageSheet">
                        <View style={styles.view}>
                            <TouchableOpacity onPress={() => {
                                setWebpage(false)
                            }} style={styles.backButton}><Text style={styles.backButtonText}>Go Back To Video</Text></TouchableOpacity>
                            <WebView
                                source={{ uri: selectedAd.website }}
                                startInLoadingState={true}
                            />
                        </View>
                    </Modal>
                }
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
    },
    view: {
        height: height - 20,
    },
    backButton: {
        backgroundColor: "#3d4849",
    },
    backButtonText: {
        color: '#FF5A5F',
        fontSize: 22,
        fontWeight: "600",
        padding: 10,
    },
    unsaveContainer: {
        alignItems: "center",
        zIndex: 10,
        width: (width - 65) / 2,
    },
    unsave: {
        alignSelf: "flex-end",
        height: 30,
        marginRight: 12,
        marginBottom: -25,
    },
    unsaveText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#C4C4C4",
    }
})

export default SavedVideos
