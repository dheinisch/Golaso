import React from 'react';
import firebase from 'react-native-firebase';
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    navBar: {
        flexDirection: 'row',
        paddingTop: 30,
        height: 80,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    navBarButton: {
        color: '#000',
        textAlign:'center',
        width: 64
    },
    navBarHeader: {
        flex: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        color: '#EEEEEE'
    },
    profileButton: {
        backgroundColor: "#bcbec1",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: "center",
        marginBottom: 20
    },

});

export default class MainHeader extends React.Component {
    render() {
        let user = firebase.auth().currentUser;
        let acronyms = this.getAcronyms(user.displayName);
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                        <View
                            style={{
                                backgroundColor: "#ff4500",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                alignSelf: "center",
                                marginBottom: 10,
                                marginLeft: 15
                            }}>
                                <Text style={{color: "white", fontSize: 20}}>{acronyms}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10, marginTop: 3, backgroundColor: 'transparent' }}>
                        <Text style={{ color: '#000', fontSize: 16 }}>{user.displayName}</Text>
                        <Text style={{ color: '#000', fontSize: 12, marginTop: 2 }}>{user.email}</Text>
                    </View>
                </View>
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
};