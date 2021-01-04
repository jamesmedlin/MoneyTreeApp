import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Dimensions,
    Button,
    Text,
    Modal,
    TouchableOpacity,
    Linking,
    ActivityIndicator
} from "react-native"
import { WebView } from "react-native-webview";
import Video from "react-native-video";
import { useAuth, AuthProvider } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Explore = (props) => {
    const { user } = useAuth();
    let [selectedAnswer, setAnswer] = useState("")
    let [isPaused, setPaused] = useState(false);
    let [quizActive, setActivation] = useState(false);
    let [ad, setAdvertisement] = useState(null);
    let focused = useIsFocused();
    let [webpage, setWebpage] = useState(false);
    let [hasStarted, setStarted] = useState(false);
    let [isAlreadySaved, setAlreadySaved] = useState(null);
    let [saveLoading, setSaveLoading] = useState(false);
    let [quizLoading, setQuizLoading] = useState(false);

    // updates page component any time the ad is changed 
    // tells video component to start playing newest ad
    useEffect(() => {
        if (ad) {
            setSaveLoading(true);
            checkIfAlreadySaved();
            setSaveLoading(false);
        }
    }, [ad])

    async function getAdvert() {
        // retrieves ad depending on current location
        let permission = await checkPermissions();
        if (permission) {
            let advert = await Geolocation.getCurrentPosition(
                async position => {
                    let latitude = parseFloat(position.coords.latitude);
                    let longitude = parseFloat(position.coords.longitude);
                    let result = await user.functions.getAdvertisement(latitude, longitude);
                    if (result) {
                        setAdvertisement(result);
                    } else {
                        setAdvertisement(null);
                        setStarted(true);
                    }
                },
                async error => {
                    console.log("ERROR MSG: ", error.message);
                    result = await user.functions.getAdvertisement(-1, -1);
                    if (result) {
                        setAdvertisement(result);
                    } else {
                        // sets explore screen to no video
                        setAdvertisement(null);
                        setStarted(true);
                    }
                }
            );
        }
        else {
            result = await user.functions.getAdvertisement(-1, -1);
            if (result) {
                setAdvertisement(result);
            } else {
                // sets explore screen to no video
                setAdvertisement(null);
                setStarted(true);
            }
        }
    }

    async function checkPermissions() {
        let checked = false;
        let permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        if (permission == RESULTS.GRANTED) {
            checked = true;
        }
        return checked;
    }

    // verifies the submitted quiz answer
    async function verifyAnswers() {
        // quiz modal is only dismissed when an answer is selected
        if (selectedAnswer) {
            setQuizLoading(true);
            // if the answer is correct
            if (selectedAnswer === ad.correctAnswer) {
                let userRefreshed = await user.refreshCustomData();
                await user.functions.confirmView(ad, userRefreshed);
                userRefreshed = await user.refreshCustomData();
            } else {
                // setting the ad to null allows the hook to catch that the ad has changed
                setAdvertisement(null);
            }
            // if there is another ad for the user to watch
            let advert = await getAdvert();
            // dismisses quiz modal
            setActivation(false);
            // clears previous quiz answer
            setAnswer("")
        } else {
        }
        setQuizLoading(false);
    }

    // retrieves user's first ad of the session
    async function startWatching() {
        await getAdvert();
    }

    // calls the quiz modal at the end of the video
    function callQuiz() {
        setActivation(true);
    }

    async function onPressSave() {
        setSaveLoading(true);
        // await user.refreshCustomData();
        await user.functions.saveOrUnsaveAd(ad._id);
        await user.refreshCustomData();
        await checkIfAlreadySaved();
        setSaveLoading(false);
    }

    const checkIfAlreadySaved = async () => {
        let result = user.customData.savedAds.includes(ad._id);
        setAlreadySaved(result);
    }

    return (
        <View style={styles.innerContainer}>
            {webpage &&
                <Modal animationType='slide' presentationStyle="pageSheet">
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => {
                            setWebpage(false)
                            setPaused(false)
                        }} style={styles.backButton}><Text style={styles.backButtonText}>Go Back To Video</Text></TouchableOpacity>
                        <WebView style={styles.webview}
                            source={{ uri: ad.website }}
                        />
                    </View>
                </Modal>
            }
            {ad ?
                <View>
                    <View style={styles.upperContainer}>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "600", marginBottom: 20 }}>Click video to see website!</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setWebpage(true)
                        setPaused(true)
                    }} style={styles.videoContainer}>
                        <Video source={{ uri: ad.uri }}
                            controls={false} style={styles.video} resizeMode={'cover'} paused={isPaused || !focused} onEnd={() => callQuiz()} ignoreSilentSwitch={"ignore"} />
                    </TouchableOpacity>
                </View>
                : null}
            {
                quizActive && ad &&
                <Modal animationType='slide' presentationStyle="pageSheet">
                    <View style={styles.modal} >
                        <Text style={styles.question}>{ad.question}</Text>
                        <View style={styles.choicesContainer}>
                            {selectedAnswer == ad.quiz[0] ? <TouchableOpacity onPress={() => setAnswer(ad.quiz[0])} style={styles.choicesSelected}><Text style={styles.choicesTextSelected}>{`${ad.quiz[0]}`}</Text></TouchableOpacity>
                                : <TouchableOpacity onPress={() => setAnswer(ad.quiz[0])} style={styles.choices}><Text style={styles.choicesText}>{`${ad.quiz[0]}`}</Text></TouchableOpacity>}
                            {selectedAnswer == ad.quiz[1] ? <TouchableOpacity onPress={() => setAnswer(ad.quiz[1])} style={styles.choicesSelected}><Text style={styles.choicesTextSelected}>{`${ad.quiz[1]}`}</Text></TouchableOpacity>
                                : <TouchableOpacity onPress={() => setAnswer(ad.quiz[1])} style={styles.choices}><Text style={styles.choicesText}>{`${ad.quiz[1]}`}</Text></TouchableOpacity>}
                            {selectedAnswer == ad.quiz[2] ? <TouchableOpacity onPress={() => setAnswer(ad.quiz[2])} style={styles.choicesSelected}><Text style={styles.choicesTextSelected}>{`${ad.quiz[2]}`}</Text></TouchableOpacity>
                                : <TouchableOpacity onPress={() => setAnswer(ad.quiz[2])} style={styles.choices}><Text style={styles.choicesText}>{`${ad.quiz[2]}`}</Text></TouchableOpacity>}
                            {quizLoading ? <ActivityIndicator size="small" style={styles.activityIndicatorSubmit}/> :
                                <TouchableOpacity onPress={() => verifyAnswers()} style={styles.submitButton}><Text style={styles.submitButtonText}>Submit</Text></TouchableOpacity>}
                        </View>
                    </View>
                </Modal>
            }
            {
                ad &&
                <View style={styles.videoButtons}>
                    <TouchableOpacity onPress={() => setPaused(!isPaused)} style={styles.playPause}><Text style={styles.playPauseText}>Play/Pause</Text></TouchableOpacity>
                    <View style={styles.optionButtons}>
                        {saveLoading && <ActivityIndicator size="small" style={styles.activityIndicatorSave} />}
                        {isAlreadySaved != null && !saveLoading && <TouchableOpacity style={styles.saveButton} onPress={() => onPressSave()}><Text style={styles.saveButtonText}>{isAlreadySaved ? "Unsave" : "Save"}</Text></TouchableOpacity>}
                    </View>
                </View>
            }
            {
                !ad && !hasStarted && <TouchableOpacity onPress={() => startWatching()} style={styles.startWatchingContainer}><Text style={styles.startWatchingText}>Start watching!</Text></TouchableOpacity>
            }
            {
                !ad && hasStarted && <TouchableOpacity onPress={() => null} style={styles.startWatchingContainer}>
                    <Text style={styles.startWatchingText}>Out of videos.</Text>
                    <Text style={styles.startWatchingText}>Come back soon!</Text>
                </TouchableOpacity>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#000000",
        width,
    },
    innerContainer: {
        width,
        backgroundColor: "#000000",
        justifyContent: "center",
        height: height,
    },
    header: {
        alignSelf: "flex-start",
        fontSize: 20,
    },
    title: {
        fontSize: 20,
        color: 'grey',
    },
    titleContainer: {
        alignSelf: 'flex-start',
    },
    tile: {
        width,
        paddingHorizontal: 30
    },
    upperContainer: {
        alignItems: "center"
    },
    videoContainer: {
        alignSelf: "center",
    },
    video: {
        height: width / (16 / 9),
        width,
    },
    touch: {
        backgroundColor: "#000000",
        color: "#000000",
        width: 100,
        height: 100,
    },
    question: {
        paddingHorizontal: 20,
        width: width - 60,
        color: "#3d4849",
        fontWeight: "700",
        fontSize: 18,
        marginBottom: 20,
    },
    choicesContainer: {
        alignItems: "center",
    },
    choices: {
        alignItems: "flex-start",
        width: width - 40,
        minHeight: 40,
        borderColor: "#3d4849",
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 15,
        justifyContent: "center",
    },
    choicesSelected: {
        alignItems: "flex-start",
        width: width - 40,
        minHeight: 40,
        borderColor: "#3d4849",
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 15,
        backgroundColor: "#3d4849",
        justifyContent: "center",
    },
    choicesText: {
        fontSize: 15,
        color: "#FF5A5F",
        fontWeight: "700",
        padding: 10,
    },
    choicesTextSelected: {
        fontSize: 15,
        color: "#FF5A5F",
        fontWeight: "700",
        padding: 10,
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
    playPause: {
        marginTop: 30,
        height: 50,
        width: 200,
        backgroundColor: "#3d4849",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 10,
    },
    playPauseText: {
        color: '#FF5A5F',
        fontSize: 18,
        fontWeight: "600",
        padding: 15,
    },
    startWatchingContainer: {
        backgroundColor: "#3d4849",
        borderRadius: 10,
        maxWidth: width * 2 / 3,
        alignSelf: "center",
        alignItems: "center",
        padding: 20,
    },
    startWatchingText: {
        color: '#FF5A5F',
        fontSize: 22,
        fontWeight: "600",
    },
    videoButtons: {
        alignSelf: "flex-end",
        width,
        height: "auto",
    },
    optionButtons: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 30,
        marginTop: 20,
    },
    activityIndicatorSave: {
        height: 40,
        width: 60,
    },
    saveButton: {
        height: 40,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
    submitButton: {
        width: 120,
        height: 45,
        backgroundColor: "#3d4849",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
        marginTop: 10,
    },
    submitButtonText: {
        fontSize: 18,
        color: "#FF5A5F",
        fontWeight: "700"
    },
    activityIndicatorSubmit: {
        alignSelf: "center",
        justifyContent: "center",
        height: 45,
        marginTop: 10,
    },
    modal: {
        height: height / 1.3,
        justifyContent: "center",
    }
})

export default Explore;
