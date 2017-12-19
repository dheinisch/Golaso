import React from "react";
import { View, Alert } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../../auth";
import Loader from "../../components/Loader";

export default class SignInScreen extends React.Component {
    state = {email: '', password: '', loading: false};

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
                <Loader loading={this.state.loading}/>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        placeholder="Email address..."
                        onChangeText={(email) => this.setState({email: email})}
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        secureTextEntry
                        placeholder="Password..."
                        onChangeText={(password) => this.setState({password: password})}
                    />
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="Sign In"
                        onPress={() => { this.signInPressed(); }}
                    />
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="transparent"
                        textStyle={{ color: "#bcbec1" }}
                        title="Don't have an account yet? Sign Up"
                        onPress={() => this.props.navigation.navigate("SignUp")}
                    />
                </Card>
            </View>
        )
    }

    signInPressed() {
        this.setState({ loading: true });
        onSignIn(this.state.email, this.state.password)
            .then((res) => {
                this.setState({ loading: false });
                if (res) {
                this.props.navigation.navigate("SignedIn")
            }
        }).catch(error => {
            Alert.alert("Error", error.message, [
                { text: "OK", onPress: () => { this.setState({ loading: false })}}
            ])
        });
    }
};