import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import firebase from 'react-native-firebase';

export default class ProfileScreen extends React.Component {
    render() {
        let user = firebase.auth().currentUser;
        let acronyms = this.getAcronyms(user.displayName);
        return (
            <View style={{paddingVertical: 20}}>
                <Card title={user.email}>
                    <View
                        style={{
                            backgroundColor: "#bcbec1",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            alignSelf: "center",
                            marginBottom: 20
                        }}>
                        <Text style={{color: "white", fontSize: 28}}>{acronyms}</Text>
                    </View>
                    <Button
                        backgroundColor="#03A9F4"
                        title="Sign Out"
                        onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
                    />
                </Card>
            </View>
        )
    }

    getAcronyms(displayName) {
        let acronyms = '';
        let fullName = displayName.split(' ');
        fullName.forEach(function (part) {
            acronyms += part.charAt(0);
        });

        return acronyms;
    }
}
