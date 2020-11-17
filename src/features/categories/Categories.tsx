import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Button,
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import Tile from "../../common/components/Tile"
import { RootStackParamsList } from "../navigation/Navigator"


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "Categories">
}

const Categories = ({ navigation }: Props) => {
    const goLanding = () => navigation.navigate("Landing")

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={30} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>To do:</Text>
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Banking" goTo="Landing" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="College" goTo="Landing" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Credit Cards" goTo="Landing" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Jobs" goTo="Landing" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Retirement" goTo="kPlans" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Housing" goTo="Landing" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Taxes" goTo="Landing" isCheckable={true} />
                    </View>
                    <Space.V s={10} />
                    <View style={styles.tile}>
                        <Tile text="Insurance" goTo="Landing" isCheckable={true} />
                    </View>
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
        marginHorizontal: 30,
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
})

export default Categories
