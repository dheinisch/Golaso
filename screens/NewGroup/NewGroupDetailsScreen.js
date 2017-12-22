import React from "react";
import { View, StyleSheet } from "react-native";
import {Card, Button, Text} from "react-native-elements";
import Input from "../../components/Input";
import {generateUuid} from "../../components/ID"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class NewGroupDetailsScreen extends React.Component {
    state = {groupName: '', groupId: ''};

    componentDidMount() {
        this.setState({groupId: generateUuid()})
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftHeaderContainer}>
                        <Button onPress={() => this.props.navigation.goBack(null)}/>
                    </View>
                    <View style={styles.rightHeaderContainer}>
                        <Button onPress={() => this.props.navigation.navigate("GroupMembers")}/>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Card>
                        <Text>
                            {this.state.groupId}
                        </Text>
                        <Input
                            placeholder="Group name..."
                            icon={null}
                            onChangeText={(groupName) => this.setState({groupName: groupName})}
                        />
                        <Button
                            buttonStyle={{ marginTop: 20 }}
                            backgroundColor="#03A9F4"
                            title="Next Step"
                            onPress={() => { this.props.navigation.navigate("GroupMembers"); }}
                        />
                    </Card>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height: 8
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#000",
        alignItems:"center",
        paddingRight: 5
    },
    leftHeaderContainer: {
        alignItems: "flex-start",
        flexDirection: "row"
    },
    rightHeaderContainer: {
        alignItems: "flex-end",
        flexDirection: "row"
    },
    contentContainer: {
        flex: 10,
    },
});