import React from "react";
import { View } from "react-native";
import {Card, Button, Text} from "react-native-elements";
import Input from "../../components/Input";
import {generateUuid} from "../../components/UUID"

export default class NewGroupDetailsScreen extends React.Component {
    state = {groupName: '', groupId: ''};

    componentDidMount() {
        this.setState({groupId: generateUuid()})
    }

    render() {
        return (
            <View style={{ paddingVertical: 20 }}>
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
        )
    }
};