import React, { useState, useEffect } from "react"
import { StyleSheet, Image, StatusBar, ScrollView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Text from "../../components/Text"

import IfComponent from "../../components/IfComponent/index"
import Box from "../../components/Box/index"
import { connect } from "react-redux";
import { groups, teamsForGroup } from '../../store/actions/groups';
import Button from "../../components/Button/index"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from "../../components/Input/index"

const Profile = (props) => {

    const [name, setName] = useState(props.user.name)
    const [email, setEmail] = useState(props.user.email)
    const [phone, setPhone] = useState("")

    const [isSecurityText, setIsSecurityText] = useState(false)

    return (


        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                {/* <Image source={require("../../../assets/home.jpg")} style={[styles.image]} /> */}
                {/* <LinearGradient colors={['transparent', 'rgba(0,0,0,.7)', 'black']} style={styles.degrade} /> */}
                <Text size={16} height="medium" style={{ marginTop: 20 }}>Meu Perfil</Text>
                <View style={[styles.inputs, { marginTop: 20, flexDirection: "row", alignItems: "center", marginHorizontal: 20, flex: 1, justifyContent: "center" }]}>
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ width: 100, height: 100 }}>
                            <View style={{position: "absolute", zIndex: 1, right: -10, top: -5, alignItems: "center", justifyContent: "center",borderRadius: 20, padding: 5, backgroundColor: "orange", height: 20, width: 20}}>
                                <Ionicons name="md-pencil" color="white" size={10} />
                            </View>
                            <Image source={{ uri: props?.user?.photo }} style={{ resizeMode: "conntain", width: "100%", height: "100%", borderRadius: 20 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column", justifyContent: "center" }}>
                            <Text weight="bold" color="#b02b4a" style={{ marginTop: 10 }}>{props.user.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.inputs, { flex: 3 }]}>
                    <Input
                        label="Nome"
                        placeholder=""
                        value={name}
                        onChange={(text, un) => {
                            setName(un);
                            // console.log(text);
                        }}
                        keyboardType="email-address"
                        leftIcon={"person"}
                        leftIconColor="#b02b4a"
                    />
                    <Input
                        label="Email"
                        placeholder=""
                        value={email}
                        onChange={(text, un) => {
                            setEmail(un);
                            // console.log(text);
                        }}
                        keyboardType="email-address"
                        leftIcon={"mail-open"}
                        leftIconColor="#b02b4a"
                    />
                    <Input
                        label="Número"
                        placeholder=""
                        value={phone}
                        onChange={(text, un) => {
                            setPhone(un);
                            // console.log(text);
                        }}
                        keyboardType="email-address"
                        leftIcon={"ios-call"}
                        leftIconColor="#b02b4a"
                    />
                    <Button text="Salvar"/>
                </View>
            </View >
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0ece9"
    },
    image: {
        position: "absolute",
        resizeMode: "cover",
        height: "100%",
        width: "100%",
    },
    logo: {
        resizeMode: "contain",
        width: scale(70),
        height: scale(70),
        alignSelf: "center",
        marginTop: 50
    },
    text: {
        color: "white",
        fontSize: scale(30),
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
        fontWeight: "bold",
    },
    subText: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        marginTop: 5,
    },
    link: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        marginTop: 5,
    },
    inputs: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 40,
        paddingVertical: 20
    },
    button: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        height: 35,
        marginTop: 20
        // borderWidth: 1,
        // borderColor: "white"
    },
    degrade: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "80%",
    },
    rodape: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        groups: state.groups.groups,
        user: state.authentication.user
    };
};

export default connect(mapStateToProps)(Profile);