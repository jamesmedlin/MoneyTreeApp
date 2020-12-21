import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Dimensions } from "react-native";
import Space from "../../common/components/abstract/Space"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { useAuth } from "../../providers/AuthProvider";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export function WelcomeView({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, signUp, signOut, signIn } = useAuth();

    useEffect(() => {
        // If there is a user logged in, go to the Profile page.
        if (user != null) {
            navigation.navigate("Profile");
        }
    }, [user]);

    // The onPressSignIn method calls AuthProvider.signIn with the
    // email/password in state.
    const onPressSignIn = async () => {
        console.log("Press sign in");
        try {
            await signIn(email, password);
        } catch (error) {
            Alert.alert(`Failed to sign in: ${error.message}`);
        }
    };

    // The onPressSignUp method calls AuthProvider.signUp with the
    // email/password in state and then signs in.
    const onPressSignUp = async () => {
        try {
            await signUp(email, password);
            signIn(email, password);
        } catch (error) {
            Alert.alert(`Failed to sign up: ${error.message}`);
        }
    };


    const onPressSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            Alert.alert(`Failed to sign out: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Test App</Text>
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
            <Button onPress={onPressSignIn} title="Sign In" />
            <Button onPress={onPressSignUp} title="Sign Up" />
            <Button onPress={onPressSignOut} title="Sign Out" />
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
        width,
    },
    inputStyle: {
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        borderRadius: 2,
    },
    text: {
        fontSize: 30,
        fontWeight: '900',
        color: 'grey',
    },
})