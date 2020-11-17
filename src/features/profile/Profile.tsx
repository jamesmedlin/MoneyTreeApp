import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import Tile from "../../common/components/Tile"
import { RootStackParamsList } from "../navigation/Navigator"


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Profile">
}

const Profile = ({ navigation }: Props) => {
    const goGetStarted = () => navigation.navigate("Categories")

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={20} />
                    <Space.V s={10} />
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Get Started" goTo="Categories" isCheckable={false}/>
                    </View>
                    <Space.V s={10} />
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
    tile: {
        width,
        paddingHorizontal: 30
    },
})

export default Profile
