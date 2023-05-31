import React from "react"
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { createIconSetFromFontello } from "react-native-vector-icons";

import Text from "../../components/Text/index"

const SCREEN_WIDTH = Dimensions.get("window").width
const SLIDE_WIDTH = SCREEN_WIDTH * 0.90

export default function VitrineNoticies({ option, index }) {
    return (
        <View style={{width: SLIDE_WIDTH, justifyContent: "center"}}>
            
            <View style={{ borderRadius: 20, marginLeft: 10, flexDirection: "row", justifyContent: "space-between" }}>


                <TouchableOpacity style={{
                    flex: 1,
                    height: 150,
                    borderRadius: 20, flexDirection: "row", backgroundColor: "#ac1b3a", marginRight: 10, paddingVertical: 10, paddingLeft: 10
                }}>
                    <Image source={option?.img} style={{ marginRight: 10, borderRadius: 20, height: 130, width: 130, flexDirection: "row", justifyContent: "center", resizeMode: "cover" }} />
                    <View style={{ flex: 1, marginTop: 0, flexDiretion: "column", alignItems: "flex-start" }}>
                        <Text
                            style={[styles.text, { color: "white", marginTop: 0, marginBottom: 0 }]}
                            size={14}
                            weight="bold"
                        >Quatar 2022</Text>
                        <Text
                            style={[styles.text, { textAlign: "left", color: "white", marginTop: 10, marginBottom: 0 }]}
                            size={12}
                            weight="medium"
                        >Temos alguns textos para testarmos no container</Text>
                    </View>
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "gray",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
    },
});