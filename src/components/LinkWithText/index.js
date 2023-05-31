import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { MaskedTextInput } from "react-native-mask-text";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Input from "../../components/Input/index"
import Link from "../../components/Link/index"


export default function LinkWithText({ text = "", textLink="", onPress = null, stylesContainer = {}}) {
    return (
        <View style={[styles.view, {...stylesContainer}]}>
            <Text style={styles.subText}>{text}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.link}>&nbsp;{textLink}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flexDirection: "row", 
        justifyContent: "center", 
        marginTop: 20
    },
    subText: {
        color: "white",
        fontSize: scale(14),
        textAlign: "center",
        marginTop: 5,
    },
    link: {
        fontWeight: "bold",
        fontSize: scale(14),
        textAlign: "center",
        marginTop: 5,
        color: "lightblue"
    },
})