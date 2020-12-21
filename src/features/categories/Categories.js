import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import {
    StyleSheet,
    View,
    Dimensions,
    Button,
    Modal,
    Text,
} from "react-native"
import Video from "react-native-video"
import { RootStackParamsList } from "../navigation/Navigator"


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Categories = (props) => {
    let { isPaused, quizActive } = useState(false);

    // const Categories = ({ navigation, currVideo }: Props) => {
    function goLanding() { this.props.navigation.navigate("Landing") }

    function pauseVideo() {
        isPaused = !isPaused;
    }

    function verifyAnswers() {
    }

    function callQuiz() {
        this.setState({ quizActive: true });
    }

    function nextAdvertisement() {
    }

    nextAdvertisement();
    return (
        <View style={styles.innerContainer}>
            <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}// this.state.advertisement.uri }}
                controls={true} style={styles.video} resizeMode={'cover'} paused={this.state.isPaused} onEnd={() => callQuiz()} />
            {quizActive && <Modal style={styles.modal} animationType='slide' onDismiss={() => verifyAnswers()}>
            </Modal>}
            <Button onPress={() => pauseVideo()} title="Pause" />
            <Button onPress={() => nextAdvertisement()} title="Next Video" />
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
        height: 200,
        width: 200,
    },
})

export default Categories;
