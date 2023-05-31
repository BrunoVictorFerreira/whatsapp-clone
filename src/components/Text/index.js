import React, { useEffect } from 'react'
import { Text } from 'react-native';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_800ExtraBold
} from "@expo-google-fonts/poppins"
export default function TextComponent({ children, style, weight = "regular", size=14, color="#0879ef" }) {

    const [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,

        Poppins_800ExtraBold
    })

    function loadFont(weight) {
        switch (weight) {
            case "thin":
                return "Poppins_100Thin"
            case "regular":
                return "Poppins_400Regular"
            case "bold":
                return "Poppins_700Bold"
            case "medium":
                return "Poppins_500Medium"
            case "extrabold":
                return "Poppins_800ExtraBold"
            default:
                return "Poppins_400Regular"
        }
    }


    return (
        <Text style={[{ fontFamily: loadFont(weight), fontSize: size, color }, style]}>{children}</Text>
    )
}

