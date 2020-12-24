import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Dimensions,
    Button,
    Text,
    Modal,
    TouchableOpacity
} from "react-native"
import Video from "react-native-video"
import { useAuth } from "../../providers/AuthProvider";
import { useIsFocused } from '@react-navigation/native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Categories = (props) => {
    const { user } = useAuth();
    let [buttonSelected, setSelected] = useState("");
    let [selectedAnswer, setAnswer] = useState("")
    let [isPaused, setPaused] = useState(false);
    let [quizActive, setActivation] = useState(false);
    let [ad, setAdvertisement] = useState(null);
    let focused = useIsFocused();

    useEffect(() => {

    }, [ad, buttonSelected])


    async function verifyAnswers() {
        if (selectedAnswer) {
            console.log("SELECTED ANSWER", selectedAnswer)
            console.log("CORRECT ANSWER", ad.correctAnswer)
            if (selectedAnswer === ad.correctAnswer) {
                let response = await user.functions.confirmView(ad._id);
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
            console.log("NEW URI", ad.uri)
        }

    }

    async function callQuiz() {
        setActivation(true);
    }

    return (
        <View style={styles.innerContainer} >
            {ad ? <Video source={{ uri: ad.uri }}
                controls={false} style={styles.video} resizeMode={'cover'} paused={isPaused || !focused} onEnd={() => callQuiz()} /> : null}
            {
                quizActive &&
                <Modal style={styles.modal} animationType='slide' presentationStyle="pageSheet">
                    <Text>{ad.question}</Text>
                    <View style={styles.choicesContainer}>
                        <TouchableOpacity onPress={() => setAnswer(ad.quiz[0])} style={styles.choices}><Text>{`${ad.quiz[0]}`}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setAnswer(ad.quiz[1])} style={styles.choices}><Text>{`${ad.quiz[1]}`}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setAnswer(ad.quiz[2])} style={styles.choices}><Text>{`${ad.quiz[2]}`}</Text></TouchableOpacity>
                        <Button onPress={() => verifyAnswers()} title="Submit" />
                    </View>
                </Modal>
            }
            {
                ad ? <Button onPress={() => setPaused(!isPaused)} title="Play/Pause" /> :
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
})

export default Categories;
