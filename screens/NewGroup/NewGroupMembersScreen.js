import React from 'react';
import Contacts from 'react-native-contacts';
import {Image, Text, View, ListView, StyleSheet, TouchableOpacity} from "react-native";
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
        let selected = [];
        if (this.state.contacts) {
            this.state.contacts.forEach((val) => {
                if (val.selected) {
                    selected.push(val);
                }
            });
        }

        let isNextDisabled = selected.length === 0;

        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.leftHeaderContainer}>
                        <TouchableOpacity style={{ marginLeft: 10, marginTop: 20 }} activeOpacity={.5} onPress={() => this.props.navigation.goBack(null)}>
                            <Text style={styles.linkText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightHeaderContainer}>
                        <TouchableOpacity disabled={isNextDisabled} style={{ marginRight: 10, marginTop: 20 }} activeOpacity={.5} onPress={() => {
                            !isNextDisabled && this.props.navigation.navigate("GroupDetails")
                        }}>
                            <Text style={styles.linkText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 12 }}>
                    <SearchBar
                        ref={search => this.search = search}
                        lightTheme
                        round
                        onChangeText={(query) => this.onSearch(query)}
                        onClearText={() => this.onSearch(null)}
                        placeholder='Type Here...' />
                    <View style={{ flexDirection: "row"}}>
                        {this.renderSelected(selected)}
                    </View>
                {this.state.dataSource &&
                        <View style={{marginTop: 5}}>
                            <ListView
                                initialListSize={5}
                                enableEmptySections={true}
                                dataSource={this.state.dataSource}
                                renderRow={(contact) => {
                                    return this.renderGroupRow(contact)
                                }}/>
                        </View>
                    }
                </View>
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
                    <View style={styles.contactContainer}>
                        <View style={styles.contactDetailsContainerWrap}>
                            <View style={styles.contactNameContainer}>
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

    renderSelected(selected) {
        return selected.map(val => {
            return (
                    <View style={{
                        backgroundColor: "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        alignSelf: "center",
                        margin: 15,
                    }}>
                        {val.hasThumbnail &&
                            <Image source={{uri: val.thumbnailPath}} style={{ borderRadius: 20, width: 40, height: 40, }}/>
                        }
                        {!val.hasThumbnail &&
                            <Image source={blankPerson} style={{ borderRadius: 20, width: 40, height: 40, }}/>
                        }
                        {/* TODO - align the givenName in single row with 3 dots in case the user length is more than X */}
                        {val.givenName.length > 5 &&
                            <Text>{val.givenName.substring(0, 5) + "..."}</Text>
                        }
                        {val.givenName.length <= 5 &&
                            <Text>{val.givenName}</Text>
                        }
                    </View>
            )});
    }
}

styles = StyleSheet.create({
    linksRow: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: 'space-between',
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.25,
        padding: 8
    },
    linkText: {
        color: "#0000ff",
        marginLeft: 5,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height: 24
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#e1e8ee",
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
        flex: 6,
    },
    listItemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    contactContainer: {
        flex: 4,
        justifyContent: "center",
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.25
    },
    contactDetailsContainerWrap: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row"
    },
    contactNameContainer: {
        marginLeft: 10,
        alignItems: "flex-start",
        flex: 1
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    initStyle: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
});
