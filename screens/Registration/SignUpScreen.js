import React from "react";
import {View, Alert} from "react-native";
import {Card, FormLabel, FormInput, Button} from "react-native-elements";
import { onSignUp } from "../../auth";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

const emailIcon = require("../../assets/images/email.png");
const personIcon = require("../../assets/images/person.png");
const lockIcon = require("../../assets/images/lock.png");

export default class SignInScreen extends React.Component {
    state = {email: '', password: '', confirmPassword: '', firstname: '', lastname: '', errorMsg: null, loading: false};

    render() {
        let isValidForm = this.isFormValid();
        return (
            <View style={{paddingVertical: 20}}>
                <Loader loading={this.state.loading}/>
                <Card>
                    <Input
                        placeholder="Email address..."
                        icon={emailIcon}
                        onChangeText={(email) => this.setState({email: email})}
                    />
                    <Input
                        placeholder="First Name..."
                        icon={personIcon}
                        onChangeText={(firstname) => this.setState({firstname: firstname})}
                    />
                    <Input
                        placeholder="Last Name..."
                        icon={personIcon}
                        onChangeText={(lastname) => this.setState({lastname: lastname})}
                    />
                    <Input
                        placeholder="Password..."
                        icon={lockIcon}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password: password})}
                    />
                    <Input
                        placeholder="Confirm Password..."
                        icon={lockIcon}
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
                    />
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#03A9F4"
                        disabled={!isValidForm}
                        title="Sign Up"
                        onPress={() => { this.signUpPressed(); }}
                    />
                </Card>
            </View>
        )
    };

    isFormValid() {
        return this.state.email !== null && this.state.email !== '' &&
            this.validateEmail(this.state.email) &&
            this.state.password !== null && this.state.password !== '' &&
            this.state.firstname !== null && this.state.firstname !== '' &&
            this.state.lastname !== null && this.state.lastname !== '' &&
            this.state.confirmPassword !== null && this.state.confirmPassword !== '' &&
            this.state.confirmPassword === this.state.password;
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    signUpPressed() {
        this.setState({ loading: true });
        onSignUp(this.state.email, this.state.password, this.state.firstname, this.state.lastname)
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
