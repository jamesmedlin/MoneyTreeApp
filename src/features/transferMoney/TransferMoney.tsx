import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Space from "../../common/components/abstract/Space";
import { RootStackParamsList } from "../navigation/Navigator";
import { useAuth } from "../../providers/AuthProvider";
import { roundMoney } from "../../common/helpers/roundMoney";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, "TransferMoney">;
}

const TransferMoney = ({ navigation }: Props) => {
  let { signOut, user } = useAuth();

  useEffect(() => {});

  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.innerContainer}>
          <Space.V s={20} />
          {user && (
            <Text style={styles.title}>
              This is the page to transfer your $
              {roundMoney(user.customData.balance)} into your account.
            </Text>
          )}
          <Space.V s={10} />
          <Text style={styles.title}>This page is not set up yet.</Text>
          <Space.V s={10} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    width,
  },
  innerContainer: {
    marginHorizontal: 12,
    alignItems: "center",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "700",
  },
  settings: {
    width,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },
  locationButtonText: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
    color: "#FF5A5F",
  },
  signOutButtonText: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "center",
    color: "black",
  },
});

export default TransferMoney;
