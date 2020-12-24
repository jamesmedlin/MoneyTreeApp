import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Dimensions,
    Button,
    Text,
    Modal
} from "react-native"
import Video from "react-native-video"
import { RootStackParamsList } from "../navigation/Navigator"
import { statement } from "@babel/template"
import store from "../../redux/store"
import { useAuth } from "../../providers/AuthProvider";


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Categories = (props) => {
    const { user } = useAuth();
    let [isPaused, setPaused] = useState(false);
    let [quizActive, setActivation] = useState(false);
    let [ad, setAdvertisement] = useState(null);

    useEffect(() => {

    }, [ad])

    async function verifyAnswers() {
        setActivation(false);
        let advert = await user.functions.getAdvertisement();
        if (advert) {
            setAdvertisement(advert);
            console.log("NEW URI", ad.uri)
        }

    }

    async function callQuiz() {
        const response = await user.functions.confirmView(ad._id);
        setActivation(!quizActive);
    }

    return (
        <View style={styles.innerContainer} >
            {ad ? <Video source={{ uri: ad.uri }}
                controls={false} style={styles.video} resizeMode={'cover'} paused={isPaused} onEnd={() => callQuiz()} /> : null}
            {
                quizActive &&
                <Modal style={styles.modal} animationType='slide' presentationStyle="pageSheet">
                    <View>
                        <Text>Question...</Text>
                        <Text>A1:{ad.quiz[0]} </Text>
                        <Text>A2: {ad.quiz[1]}</Text>
                        <Text>A3: {ad.quiz[2]}</Text>
                        <Button onPress={() => verifyAnswers()} title="Submit" />
                    </View>
                </Modal>
            }
            {ad ? <Button onPress={() => setPaused(!isPaused)} title="Play/Pause" /> :
                <Button onPress={() => verifyAnswers()} title="Start watching!" />}
        </View>
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
    modal: {
        backgroundColor: 'blue',
        height: "100px",
    },
})

export default Categories;
