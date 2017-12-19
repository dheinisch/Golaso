import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import SignUp from "../screens/Registration/SignUpScreen";
import SignIn from "../screens/Registration/SignInScreen";
import Home from "../screens/HomeScreen";
import Profile from "../screens/ProfileScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In",
            headerStyle
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up",
            headerStyle
        }
    }
});

export const SignedIn = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Home",
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: "Profile",
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }
        }
    }
);

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};