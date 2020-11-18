import React from "react"
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native"
import Animated from "react-native-reanimated"
import { useTimingTransition } from "react-native-redash"
import { useNavigation } from '@react-navigation/native'

var width = Dimensions.get('window').width;
enum progress { hasNotStarted, inProgress, complete }

interface StatusBoxProps {
    text: string
    goTo?: any
    children?: any
    status?: progress
}

const StatusBox = ({ text, goTo, children, status }: StatusBoxProps) => {
    const navigation = useNavigation();
    var statusComponent = null;

    if (status == progress.hasNotStarted) {
        statusComponent = (
            <Text style={styles.text}>Plant a Seed!</Text>
        )
    }

    if (goTo) {
        return (
            <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate(goTo) }}>
                {/* <Image style={styles.image} source={require('')}/> */}
                <View style={styles.innerContainer}>
                    <View style={styles.childContainer}>
                        {statusComponent}
                        {children}
                    </View>
                    <View style={styles.titlecontainer}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity style={styles.container} disabled={true}>
                {/* <Image style={styles.image} source={require('')}/> */}
                <View style={styles.innerContainer}>
                    <View style={styles.childContainer}>
                        {statusComponent}
                        {children}
                    </View>
                    <View style={styles.titlecontainer}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: (width - 100) / 2,
        height: (width - 100) / 2,
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
        minHeight: 80,
        marginBottom: 40,
        flexDirection: 'row',
    },
    innerContainer: {
        flexDirection: 'column',
        width: (width - 100) / 2,
        height: (width - 100) / 2,
    },
    childContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        zIndex: 0,
    },
    titlecontainer: {
        width: (width - 100) / 2,
        alignItems: 'flex-end',
        paddingRight: 5,
        paddingBottom: 5,
        alignSelf: 'flex-end',
        zIndex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: "700",
        color: "grey",
    },
    image: {
        width: 140,
        height: 140,
    },
})

export default StatusBox
