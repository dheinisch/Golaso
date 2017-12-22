import {StyleSheet} from "react-native";
import React from "react";

export default styles = StyleSheet.create({
    linksRow: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: 'space-between',
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.25,
        padding: 15
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
    listItemContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    callerDetailsContainer: {
        flex: 4,
        justifyContent: "center",
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.25
    },
    callerDetailsContainerWrap: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row"
    },
    nameContainer: {
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