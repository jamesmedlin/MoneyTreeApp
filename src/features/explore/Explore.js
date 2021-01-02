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
    Linking
} from "react-native"
import { WebView } from "react-native-webview";
import Video from "react-native-video";
import { useAuth } from "../../providers/AuthProvider";
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

    // updates page component any time the ad is changed 
    // tells video component to start playing newest ad
    useEffect(() => {
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
            // if the answer is correct
            if (selectedAnswer === ad.correctAnswer) {
                let userRefreshed = await user.refreshCustomData();
                let response = await user.functions.confirmView(ad, userRefreshed);
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
    }

    // retrieves user's first ad of the session
    async function startWatching() {
        setStarted(true);
        let advert = await getAdvert();
    }

    // calls the quiz modal at the end of the video
    function callQuiz() {
        setActivation(true);
    }

    return (
        <View style={styles.innerContainer} >
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
                <TouchableOpacity onPress={() => {
                    setWebpage(true)
                    setPaused(true)
                }}>
                    <Video source={{ uri: ad.uri }}
                        controls={false} style={styles.video} resizeMode={'cover'} paused={isPaused || !focused} onEnd={() => callQuiz()} ignoreSilentSwitch={"ignore"} />
                </TouchableOpacity>
                : null}
            {
                quizActive && ad &&
                <Modal style={styles.modal} animationType='slide' presentationStyle="pageSheet">
                    <Text>{ad.question}</Text>
                    <View style={styles.choicesContainer}>
                        {selectedAnswer == ad.quiz[0] ? <TouchableOpacity onPress={() => setAnswer(ad.quiz[0])} style={styles.choicesSelected}><Text>{`${ad.quiz[0]}`}</Text></TouchableOpacity>
                            : <TouchableOpacity onPress={() => setAnswer(ad.quiz[0])} style={styles.choices}><Text>{`${ad.quiz[0]}`}</Text></TouchableOpacity>}
                        {selectedAnswer == ad.quiz[1] ? <TouchableOpacity onPress={() => setAnswer(ad.quiz[1])} style={styles.choicesSelected}><Text>{`${ad.quiz[1]}`}</Text></TouchableOpacity>
                            : <TouchableOpacity onPress={() => setAnswer(ad.quiz[1])} style={styles.choices}><Text>{`${ad.quiz[1]}`}</Text></TouchableOpacity>}
                        {selectedAnswer == ad.quiz[2] ? <TouchableOpacity onPress={() => setAnswer(ad.quiz[2])} style={styles.choicesSelected}><Text>{`${ad.quiz[2]}`}</Text></TouchableOpacity>
                            : <TouchableOpacity onPress={() => setAnswer(ad.quiz[2])} style={styles.choices}><Text>{`${ad.quiz[2]}`}</Text></TouchableOpacity>}
                        <Button onPress={() => verifyAnswers()} title="Submit" />
                    </View>
                </Modal>
            }
            {
                ad && <TouchableOpacity onPress={() => setPaused(!isPaused)} style={styles.playPause}><Text style={styles.playPauseText}>Play/Pause</Text></TouchableOpacity>
            }
            {
                !ad && !hasStarted && <TouchableOpacity onPress={() => startWatching()} style={styles.startWatchingContainer}><Text style={styles.startWatchingText}>Start watching!</Text></TouchableOpacity>
            }
            {
                !ad && hasStarted && <TouchableOpacity onPress={() => startWatching()} style={styles.startWatchingContainer}><Text style={styles.startWatchingText}>Out of videos. Come back soon!</Text></TouchableOpacity>
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
        height,
        alignItems: "center",
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
    choicesContainer: {
        alignItems: "center",
    },
    choices: {
        alignItems: "flex-start",
        width: width - 40,
        height: 40,
        borderColor: "grey",
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 10,
    },
    choicesSelected: {
        alignItems: "flex-start",
        width: width - 40,
        height: 40,
        borderColor: "grey",
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 10,
        backgroundColor: "grey",
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
        justifyContent: "center",
        alignItems: "center",
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
    },
    startWatchingText: {
        color: '#FF5A5F',
        fontSize: 22,
        fontWeight: "600",
        padding: 20,
    },
})

export default Explore;
