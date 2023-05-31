import React from "react"
import { StyleSheet, View, Image } from 'react-native';
import { scale } from 'react-native-size-matters';
import Text from "../../components/Text/index"
export default function EmphasisHome({ options }) {

    return (
        <View style={{ justifyContent: "flex-end" }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", paddingLeft: 30 }}>
                <Image source={options?.firstBrasao} style={styles.logo} />
                <Text
                    style={[styles.text, { alignSelf: "center", marginLeft: 10, marginRight: 10 }]}
                    weight="bold"
                    size={30}
                >
                    vs
                </Text>

                <Image source={options?.secondBrasao} style={styles.logo} />
            </View>
            <Text
                style={[styles.text, { textAlign: "left", marginTop: 10, backgroundColor: "rgba(0,0,0,.2)" }]}
                size={40}
                weight="extrabold"
            >JOGO DO DIA</Text>
        </View>


    )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: "cover",
        width: scale(70),
        height: scale(50),
        alignSelf: "center",
        borderRadius: 10
    },
    text: {
        color: "white",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
    },
});