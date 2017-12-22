import React from 'react';
import Contacts from 'react-native-contacts';
import styles from '../../components/Styles';
import {Image, Text, View, ListView} from "react-native";
import {CheckBox, SearchBar} from "react-native-elements";
import firebase from 'react-native-firebase';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const blankPerson = require('../../assets/images/blank_person_51.png');

export default class NewGroupScreen extends React.Component {
    state = {contacts: null, dataSource: null};

    componentWillMount() {
        Contacts.checkPermission( (err, permission) => {
            if(permission === 'undefined'){
                Contacts.requestPermission( (err, permission) => {
                    // TODO
                })
            }
            if(permission === 'authorized'){
                // TODO
            }
            if(permission === 'denied'){
                // TODO
            }
        });
    }

    componentDidMount() {
        this.loadContacts().then((data => {
            let items = [];
            data.forEach(contact => {
                contact['selected'] = false;
                items.push(contact);
            });
            this.setState({ contacts: items, dataSource: ds.cloneWithRows(items)})
        }));
    }

    render() {
        return (
            <View>
                <SearchBar
                    ref={search => this.search = search}
                    round
                    onChangeText={(query) => this.onSearch(query)}
                    onClearText={() => this.onSearch(null)}
                    placeholder='Type Here...' />
                {this.renderSelected()}
                {this.state.dataSource &&
                <View style={{marginTop: 5}}>
                    <View style={styles.contentContainer}>
                        <ListView
                            initialListSize={5}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={(contact) => {
                                return this.renderGroupRow(contact)
                            }}/>
                    </View>
                </View>
                }
            </View>
        )
    }

    renderGroupRow(contact) {
        let contactEmail = contact.emailAddresses.find(() => {return true}).email;
        return (
                <View style={styles.listItemContainer}>
                    <View style={styles.iconContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', width: 50 }}
                                onPress={() => this.onContactSelected(contact)}
                                checked={contact.selected}
                            />
                            {contact.hasThumbnail &&
                                <Image source={{uri: contact.thumbnailPath}} style={styles.initStyle} resizeMode='contain'/>
                            }
                            {!contact.hasThumbnail &&
                                <Image source={blankPerson} style={styles.initStyle} resizeMode='contain'/>
                            }
                        </View>
                    </View>
                    <View style={styles.callerDetailsContainer}>
                        <View style={styles.callerDetailsContainerWrap}>
                            <View style={styles.nameContainer}>
                                <Text style={{fontWeight: '600'}}>{contact.givenName}</Text>
                                <View style={styles.dateContainer}>
                                    <Text style={{fontWeight: '400', color: '#666', fontSize: 12}}>{contactEmail}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
        )
    }

    onContactSelected(contact) {
        let contacts = this.state.contacts.map(element => {
            if (element.recordID === contact.recordID) {
                element.selected = !element.selected;
            }

            return element;
        });

        let newDataSource = ds.cloneWithRows(contacts);
        this.search.clearText();
        this.setState({contacts: contacts, dataSource: newDataSource});
    }

    loadContacts() {
        return new Promise((resolve, reject) => Contacts.getAll((err, contacts) => {
            if(err === 'denied'){
                //TODO
            } else {
                let emailContacts = this.filterNonEmailContacts(contacts);
                resolve(emailContacts.sort((a, b) => {
                    let nameA = a.givenName.toUpperCase();
                    let nameB = b.givenName.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                }));
            }
        }));
    }

    //TODO return only users which the applications is installed for
    filterNonEmailContacts(contacts) {
        return contacts.filter(contact => contact.emailAddresses !== null && contact.emailAddresses.length > 0);
    }

    onSearch(query) {
        let newDataSource = null;
        if (query === null) {
            newDataSource = ds.cloneWithRows(this.state.contacts);
        } else {
            let filterContacts = this.state.contacts.filter(c => {
                if (c.givenName.toLocaleLowerCase().indexOf(query.toLowerCase()) > -1) {
                    return c;
                }
            });
            newDataSource = ds.cloneWithRows(filterContacts);
        }

        this.setState({dataSource: newDataSource});
    }

    renderSelected() {
        // TODO - render thumbnails with selected contacts
    }
}

