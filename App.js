import React from "react";
import { createRootNavigator } from "./navigation/RootNavigation";
import { isSignedIn } from "./auth";
import Contacts from 'react-native-contacts';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false,
        };
    }

    componentWillMount() {
        Contacts.checkPermission( (err, permission) => {
            // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
            if(permission === 'undefined'){
                Contacts.requestPermission( (err, permission) => {
                    // ...
                })
            }
            if(permission === 'authorized'){
                // yay!
            }
            if(permission === 'denied'){
                // x.x
            }
        })
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert("An error occurred"));
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        return <Layout />;
    }
}