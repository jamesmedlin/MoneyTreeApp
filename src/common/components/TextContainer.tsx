import React from "react"
import { Text, View, StyleSheet } from "react-native"

interface TextContainerProps {
    children: any
}

const TextContainer = ({ children }: TextContainerProps) => {


    return (
        <View style={styles.tile}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    tile: {
        borderRadius: 7,
        backgroundColor: "white",
        bottom: "10%",
        shadowColor: "black",
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
    },
})

export default TextContainer
