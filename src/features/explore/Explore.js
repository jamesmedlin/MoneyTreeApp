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


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Explore = (props) => {
    const { user } = useAuth();
    let [buttonSelected, setSelected] = useState("");
    let [selectedAnswer, setAnswer] = useState("")
    let [isPaused, setPaused] = useState(false);
    let [quizActive, setActivation] = useState(false);
    let [ad, setAdvertisement] = useState(null);
    let focused = useIsFocused();
    let [webpage, setWebpage] = useState(false);

    useEffect(() => {
    }, [ad, buttonSelected])


    async function verifyAnswers() {
        if (selectedAnswer) {
            if (selectedAnswer === ad.correctAnswer) {
                let userRefreshed = await user.refreshCustomData()
                let response = await user.functions.confirmView(ad, userRefreshed);
                userRefreshed = await user.refreshCustomData()
            } else {
                setAdvertisement(null);
            }
            let advert = await user.functions.getAdvertisement();
            if (advert) {
                setAdvertisement(advert);
                console.log("NEW URI", ad.uri)
            }
            setActivation(false);
            setAnswer("")
        } else {
        }
    }

    async function startWatching() {
        let advert = await user.functions.getAdvertisement();
        if (advert) {
            setAdvertisement(advert);
        }

    }

    async function callQuiz() {
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
                        }} style={styles.backButton}><Text>Go Back To Video</Text></TouchableOpacity>
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
                        controls={false} style={styles.video} resizeMode={'cover'} paused={isPaused || !focused} onEnd={() => callQuiz()} />
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
                ad ? <TouchableOpacity onPress={() => setPaused(!isPaused)} style={styles.playPause}><Text style={styles.playPauseText}>Play/Pause</Text></TouchableOpacity> :
                    <Button onPress={() => startWatching()} title="Start watching!" />
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
        height: 40,
        width: 100,
    },
    playPause: {
        marginTop: 30,
        height: 50,
        width: 200,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    playPauseText: {
        color: "white",
    }
})

export default Explore;
