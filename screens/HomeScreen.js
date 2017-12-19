import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import firebase from 'react-native-firebase';

const images = [
    {
        key: 1,
        name: "Nathan Anderson",
        image: require("../assets/images/1.jpg"),
        url: "https://unsplash.com/photos/C9t94JC4_L8"
    },
    {
        key: 2,
        name: "Jamison McAndie",
        image: require("../assets/images/2.jpg"),
        url: "https://unsplash.com/photos/waZEHLRP98s"
    },
    {
        key: 3,
        name: "Alberto Restifo",
        image: require("../assets/images/3.jpg"),
        url: "https://unsplash.com/photos/cFplR9ZGnAk"
    },
    {
        key: 4,
        name: "John Towner",
        image: require("../assets/images/4.jpg"),
        url: "https://unsplash.com/photos/89PFnHKg8HE"
    }
];

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    {images.map(({name, image, url, key}) => (
                        <Card title={`CARD ${key}`} image={image} key={key}>
                            <Text style={{marginBottom: 10}}>
                                Photo by {name}.
                            </Text>
                            <Button
                                backgroundColor="#03A9F4"
                                title="VIEW NOW"
                                onPress={() => Linking.openURL(url)}
                            />
                        </Card>
                    ))}
                </ScrollView>
            </View>
        )
    }
}

