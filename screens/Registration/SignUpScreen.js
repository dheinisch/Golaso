import React from "react";
import {View, Alert} from "react-native";
import {Card, FormLabel, FormInput, Button} from "react-native-elements";
import { onSignUp } from "../../auth";
import Loader from "../../components/Loader";

export default class SignInScreen extends React.Component {
    state = {email: '', password: '', errorMsg: null, loading: false};

    render() {
        return (
            <View style={{paddingVertical: 20}}>
                <Loader loading={this.state.loading}/>
                <Card>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        onChangeText={(email) => this.setState({email: email})}
                        placeholder="Email address..."
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        secureTextEntry
                        placeholder="Password..."
                        onChangeText={(password) => this.setState({password: password})}
                    />
                    <FormLabel>Confirm Password</FormLabel>
                    <FormInput secureTextEntry placeholder="Confirm Password..."/>
                    <FormLabel>Confirm Password</FormLabel>
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        title="Sign Up"
                        onPress={() => { this.signUpPressed(); }}
                    />
                </Card>
            </View>
        )
    };

    signUpPressed() {
        this.setState({ loading: true });
        onSignUp(this.state.email, this.state.password)
            .then((res) => {
            this.setState({ loading: false });
            if (res) {
                this.props.navigation.navigate("SignIn")
            }
        }).catch(error => {
            Alert.alert("Error", error.message, [
                { text: "OK", onPress: () => { this.setState({ loading: false })}}
            ])
        });
    }
};
