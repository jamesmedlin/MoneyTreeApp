import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "../../providers/AuthProvider";
// import styles from "../stylesheet";

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
        <View>
            <Text>Signup or Signin:</Text>
            <View>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email"
                    autoCapitalize="none"
                />
            </View>
            <View>
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="password"
                    secureTextEntry
                />
            </View>
            <Button onPress={onPressSignIn} title="Sign In" />
            <Button onPress={onPressSignUp} title="Sign Up" />
            <Button onPress={onPressSignOut} title="Sign Out" />
        </View>
    );
}