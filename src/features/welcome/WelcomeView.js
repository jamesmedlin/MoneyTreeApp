import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Space from "../../common/components/abstract/Space"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useAuth } from "../../providers/AuthProvider";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export function WelcomeView({ navigation }) {
    const [loginScreen, setScreen] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, signUp, signIn } = useAuth();

    useEffect(() => {
        // If there is a user logged in, go to the Home page.
        if (user != null) {
            if (user.customData.hasOnboarded) {
                navigation.navigate("Home");
            } else {
                navigation.navigate("OnboardingIntro")
            }
        }
    }, [user, loginScreen]);

    // The onPressSignIn method calls AuthProvider.signIn with the
    // email/password in state.
    const onPressSignIn = async () => {
        setLoading(true);
        console.log("Press sign in");
        try {
            await signIn(email, password);
            setScreen(true);
        } catch (error) {
            console.log(`Failed to sign in: ${error.message}`);
        }
        setLoading(false);
    };

    // The onPressSignUp method calls AuthProvider.signUp with the
    // email/password in state and then signs in.
    const onPressSignUp = async () => {
        setLoading(true);
        try {
            let success = await signUp(email, password);
            if (success) {
                await signIn(email, password);
                setScreen(true);
            }
        } catch (error) {
            console.log(`Failed to sign up: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" />}
            <Text style={styles.text}>{loginScreen ? "Login" : "Create Account"}</Text>
            <Space.V s={10} />
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email"
                    style={styles.inputStyle}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="password"
                    style={styles.inputStyle}
                    secureTextEntry
                />
            </View>
            <Space.V s={10} />
            {loginScreen ? <TouchableOpacity onPress={onPressSignIn}><Text style={styles.topChoice}>Log In</Text></TouchableOpacity> : <TouchableOpacity onPress={onPressSignUp}><Text style={styles.topChoice}>Sign Up</Text></TouchableOpacity>}
            <Space.V s={5} />
            {loginScreen ? <TouchableOpacity onPress={() => setScreen(false)}><Text style={styles.bottomChoice}>Create Account</Text></TouchableOpacity> :
                <TouchableOpacity onPress={() => setScreen(true)}><Text style={styles.bottomChoice}>Go back to Login</Text></TouchableOpacity>}
            <Space.V s={100} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: Colors.lighter,
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    },
    inputContainer: {
        padding: 5,
        width: width - 20,
    },
    inputStyle: {
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
    },
    text: {
        fontSize: 30,
        fontWeight: '900',
        color: 'grey',
    },
    topChoice: {
        fontSize: 22,
        fontWeight: "700",
    },
    bottomChoice: {
        fontSize: 16,
        fontWeight: "700",
    }
})