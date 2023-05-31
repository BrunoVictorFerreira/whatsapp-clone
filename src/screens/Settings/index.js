import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { MaskedTextInput } from "react-native-mask-text";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Input from "../../components/Input/index"
import Link from "../../components/Link/index"
import LinkWithText from "../../components/LinkWithText/index"
import Button from "../../components/Button/index"
import { logout, cleanError } from '../../store/actions/authentication';
import { connect } from "react-redux"
import Text from "../../components/Text"
import Ionicons from '@expo/vector-icons/Ionicons';

const Settings = (props) => {
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")

    const [isSecurityText, setIsSecurityText] = useState(false)
    // console.log("props.token", props.token)
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                {/* <Image source={require("../../../assets/home.jpg")} style={[styles.image]} /> */}
                {/* <LinearGradient colors={['transparent', 'rgba(154,16,49,.4)', '#9a1031']} style={styles.degrade} /> */}
                <View style={[styles.inputs, { marginTop: 20, flexDirection: "row", alignItems: "center", marginHorizontal: 20, flex: 1, justifyContent: "space-between" }]}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: 60, height: 60 }}>
                            <Image source={{ uri: props?.user?.photo }} style={{ resizeMode: "contain", width: "100%", height: "100%", borderRadius: 30 }} />
                        </View>
                        <View style={{ marginLeft: 10, flexDirection: "column", justifyContent: "center" }}>
                            <Text weight="medium" color="#b02b4a" size={12}>Bem Vindo,</Text>
                            <Text weight="bold" color="#b02b4a">{`${props.user.name.split(" ")[0]} ${props.user.name.split(" ")[1]}` }</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { props.dispatch(logout(props.token)) }}
                            style={{ alignItems: "center" }}>
                            <Ionicons
                                name={"ios-log-out-outline"}
                                size={18}
                                color={"#b02b4a"}
                            />
                            <Text weight="bold" color='#b02b4a'>Logout</Text>
                        </TouchableOpacity>
                        {/* <Button text="Logout" style={{ flex: 1 }}  /> */}
                    </View>
                </View>
                <View style={[styles.inputs, { flex: 3 }]}>
                    <TouchableOpacity style={styles.box}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons
                                name={"ios-person-outline"}
                                size={20}
                                color={"#b02b4a"}
                            />
                            <Text size={14} weight="bold" style={{ marginLeft: 10 }} color='#b02b4a'>Meu Perfil</Text>
                        </View>
                        <View>
                            <Ionicons
                                name={"chevron-forward"}
                                size={20}
                                color={"#b02b4a"}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons
                                name={"ios-star-outline"}
                                size={20}
                                color={"#b02b4a"}
                            />
                            <Text size={14} weight="bold" style={{ marginLeft: 10 }} color="#b02b4a">Time Favorito</Text>
                        </View>
                        <View>
                            <Ionicons
                                name={"chevron-forward"}
                                size={20}
                                color={"#b02b4a"}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons
                                name={"ios-settings-outline"}
                                size={20}
                                color={"#b02b4a"}
                            />
                            <Text size={14} weight="bold" color="#b02b4a" style={{ marginLeft: 10 }}>Preferências</Text>
                        </View>
                        <View>
                            <Ionicons
                                name={"chevron-forward"}
                                size={20}
                                color={"#b02b4a"}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons
                                name={"ios-help-outline"}
                                size={20}
                                color={"#b02b4a"}
                            />
                            <Text size={14} weight="bold" color="#b02b4a" style={{ marginLeft: 10 }}>Ajuda</Text>
                        </View>
                        <View>
                            <Ionicons
                                name={"chevron-forward"}
                                size={20}
                                color={"#b02b4a"}
                            />
                        </View>
                    </TouchableOpacity>
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
    box: {
        paddingVertical: 20,
        borderBottomColor: "#b02b4a",
        borderBottomWidth: .5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
        user: state.authentication.user,
    };
};

export default connect(mapStateToProps)(Settings);