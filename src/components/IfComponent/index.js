import React from "react"
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { scale } from 'react-native-size-matters';
import Text from "../../components/Text/index"

export default function IfComponent({ state, hidden = false, children }) {

    if(hidden){
        return ''
    }

    return children;

}