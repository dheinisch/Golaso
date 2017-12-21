import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput
} from 'react-native';

export default class Input extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        {this.props.icon &&
                        <Image source={this.props.icon} style={styles.icon} resizeMode="contain"/>
                        }
                    </View>
                    <TextInput
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        style={styles.input}
                        secureTextEntry={this.props.secureTextEntry}
                        onChangeText={this.props.onChangeText}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        paddingVertical: 20,
    },
    inputWrap: {
        flexDirection: "row",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
        tintColor: "#000"
    },
});