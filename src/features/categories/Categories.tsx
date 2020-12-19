import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
    TouchableOpacity,
} from "react-native"
import Video from "react-native-video"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import Tile from "../../common/components/Tile"
import { RootStackParamsList } from "../navigation/Navigator"


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Categories">
    currVideo: string
}

const Categories = ({ navigation, currVideo }: Props) => {
    const goLanding = () => navigation.navigate("Landing")
    let [isPaused] = useState(false)

    return (
        // <ScrollView
        //     contentInsetAdjustmentBehavior="automatic"
        //     style={styles.scrollView}
        // >
        <View style={styles.innerContainer}>
            <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
                controls={false} style={styles.video} resizeMode={'cover'} paused={isPaused} />
            <Button onPress={() => null} title="Next Video" />
        </View>

        // </ScrollView>
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
        // width,
        // height: "auto",
        height: width / (16 / 9),
        width,
    },
    touch: {
        backgroundColor: "#000000",
        color: "#000000",
        width: 100,
        height: 100,
    }
})

export default Categories

// {/* <Space.V s={30} />
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>To do:</Text>
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Banking" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="College" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Credit Cards" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Jobs" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Retirement" goTo="kPlans" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Housing" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Taxes" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} />
//                     <View style={styles.tile}>
//                         <Tile text="Insurance" goTo="Landing" isCheckable={true} />
//                     </View>
//                     <Space.V s={10} /> */}