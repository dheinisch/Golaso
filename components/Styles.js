import {StyleSheet} from "react-native";
import React from "react";

export default styles = StyleSheet.create({
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
        backgroundColor: "#7ED321",
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
    logoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "flex-start",
        marginLeft: 10
    },
    listItemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    contactDetailsContainer: {
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
    callIconContainer: {
        flex: 1,
        alignItems: "flex-end"
    },
    initStyle: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
});