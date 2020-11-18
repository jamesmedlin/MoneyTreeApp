import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Animated from "react-native-reanimated"
import { useTimingTransition } from "react-native-redash"
import { useNavigation } from '@react-navigation/native'

interface TileProps {
    goTo: string
    text: string
    isCheckable: boolean
}

const Tile = ({ goTo, text, isCheckable }: TileProps) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.tile} onPress={() => { navigation.navigate(goTo) }}>
            {isCheckable ?
                <View style={styles.container}>
                    <View style={styles.circleContainer}>
                        <TouchableOpacity style={styles.circle}></TouchableOpacity>
                    </View>
                    <Text style={styles.text2}>{text}</Text>
                </View>
                : <Text style={styles.text}>{text}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tile: {
        borderRadius: 10,
        backgroundColor: "white",
        bottom: "10%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.0,
        elevation: 10,
        minWidth: 200,
        padding: 15,
        minHeight: 80,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    text: {
        alignSelf: "flex-start",
        fontSize: 20,
        color: 'grey',
        paddingTop: 3,
    },
    text2: {
        alignSelf: "flex-start",
        fontSize: 20,
        color: 'grey',
        paddingTop: 3,
        paddingRight: 30,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    circleContainer: {
        flexDirection: "column",
        justifyContent: "center",
    },
    circle: {
        alignSelf: "flex-start",
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#c4c4c4",
        marginRight: 12,
    },
})

export default Tile
