import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import SignUp from "../screens/Registration/SignUpScreen";
import SignIn from "../screens/Registration/SignInScreen";
import Groups from "../screens/GroupsScreen";
import Profile from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import NewGroupDetailsScreen from "../screens/NewGroup/NewGroupDetailsScreen";
import NewGroupMembersScreen from "../screens/NewGroup/NewGroupMembersScreen";
import MainHeader from "../components/MainHeader";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const GameNav = TabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: "Groups",
            }
        },
    },
    {
        tabBarOptions: {
            style: {
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }
        }
    }
);

export const NewGroupNav = StackNavigator({
    // TODO change the order after implementing next button like back button
    GroupDetails: {
        screen: NewGroupDetailsScreen,
        navigationOptions: {
            title: "Group Details",
            headerStyle
        }
    },
    GroupMembers: {
        screen: NewGroupMembersScreen,
        navigationOptions: {
            title: "Add Members",
            headerStyle
        }
    }
});

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

export const SignedIn = StackNavigator(
    {
        Groups: {
            screen: Groups,
            navigationOptions: ({navigation}) => ({
                header: <MainHeader navigation = {navigation} />
            })
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Profile",
                headerStyle
            }
        },
        NewGroup: {
            screen: NewGroupNav,
            navigationOptions: {
                header: null,
            }
        },
        Game: {
            screen: GameNav,
            navigationOptions: ({navigation}) => ({
                header: <MainHeader navigation = {navigation} />
            })

        }
    },
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