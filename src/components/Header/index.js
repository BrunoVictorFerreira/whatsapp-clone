import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default function Header({ text = "", onPress = null, stylesText = {}, icon = "", iconStyle = "", iconPress = null }) {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: "#ac1b3a"}}>
            <TouchableOpacity onPress={onPress}>
                {
                    icon != "" && <Ionicons name={icon} style={iconStyle} />
                }
            </TouchableOpacity>
            <Text style={[styles.link, stylesText]}>{text}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    link: {
        fontWeight: "bold",
        fontSize: scale(14),
        textAlign: "center",
        marginTop: 5,
        color: "lightblue",
        textAlign: "right"
    },
})