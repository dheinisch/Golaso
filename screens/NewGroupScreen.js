import React from 'react';
import Contacts from 'react-native-contacts';
import styles from '../components/Styles';
import {Image, Text, TouchableOpacity, View, ListView} from "react-native";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class NewGroupScreen extends React.Component {
    state = {contacts: null};

    componentDidMount() {
        this.loadContacts().then((data => {
            this.setState({ contacts: ds.cloneWithRows(data) })
        }));
    }

    render() {
        return (
            <View>
                {this.state.contacts &&
                <View style={{marginTop: 5}}>
                    <View style={styles.contentContainer}>
                        <ListView
                            initialListSize={5}
                            enableEmptySections={true}
                            dataSource={this.state.contacts}
                            renderRow={(group) => {
                                return this.renderGroupRow(group)
                            }}/>
                    </View>
                </View>
                }
            </View>
        )
    }

    renderGroupRow(contact) {
        console.log(contact);
        return (
            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Game")}>
                <View style={styles.listItemContainer}>
                    <View style={styles.iconContainer}>
                        <Image source={{uri: contact.thumbnailPath}} style={styles.initStyle} resizeMode='contain'/>
                    </View>
                    <View style={styles.callerDetailsContainer}>
                        <View style={styles.callerDetailsContainerWrap}>
                            <View style={styles.nameContainer}>
                                <Text style={{fontWeight: '600'}}>{group}</Text>
                                <View style={styles.dateContainer}>
                                    <Text style={{fontWeight: '400', color: '#666', fontSize: 12}}>Leader is Dor with 40
                                        pts</Text>
                                </View>
                            </View>
                            <View style={styles.callIconContainer}>
                                <Icon name="chevron-right" color='#000' size={23} style={{padding: 5}}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    loadContacts() {
        return new Promise((resolve, reject) => Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
            } else {
                resolve(contacts);
            }
        }));
    }
}

