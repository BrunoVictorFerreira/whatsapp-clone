import React from "react"
import { StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Text from "../../components/Text/index"

export default function Link({ text = "", onPress = null, stylesText = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.link, stylesText ]} weight="bold">{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        fontWeight: "bold",
        fontSize: scale(14),
        textAlign: "center",
        color: "lightblue", 
        textAlign: "right"
    },
})