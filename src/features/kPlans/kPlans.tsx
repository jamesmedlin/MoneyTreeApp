import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
    ScrollView,
    StyleSheet,
    View,
    Dimensions,
    Text,
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import Space from "../../common/components/abstract/Space"
import TitleContainer from "../../common/components/TitleContainer"
import TextContainer from "../../common/components/TextContainer"
import { RootStackParamsList } from "../navigation/Navigator"


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

interface Props {
    navigation: StackNavigationProp<RootStackParamsList, "kPlans">
}

const kPlans = ({ navigation }: Props) => {
    const goGetStarted = () => navigation.navigate("Categories")

    return (
        <View>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Space.V s={20} />
                    <View style={styles.container}>
                        <TitleContainer text="Here is where the title goes." />
                    </View>
                    <Space.V s={20} />
                    <TextContainer>
                        <Text>Here is where the content goes. Not sure how long this should be or what needs to be in here. Will figure that out later.</Text>
                    </TextContainer>
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
    container: {
        width,
        paddingHorizontal: 12,
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

export default kPlans
