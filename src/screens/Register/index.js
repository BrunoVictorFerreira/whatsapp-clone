import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { MaskedTextInput } from "react-native-mask-text";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Input from "../../components/Input/index"
import Link from "../../components/Link/index"
import LinkWithText from "../../components/LinkWithText/index"
import Button from "../../components/Button/index"
import { connect } from "react-redux"
import { register, cleanError } from '../../store/actions/authentication';
import validateEmail from "../../utils/validateEmail";
import * as Animatable from 'react-native-animatable';
import Text from "../../components/Text/index"

const Register = (props) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("")
    const [isSecurityText, setIsSecurityText] = useState(true)
    const [isSecurityTextConfirm, setIsSecurityTextConfirm] = useState(true)

    const [step, setStep] = useState(1)

    const submit = () => {
        if (step == 3) {
            props.dispatch(cleanError())
            props.dispatch(register(name, email, password, passwordConfirm))
            // props.navigation.navigate('Login')
        } else {
            if (step == 1 && name == "") {
                Alert.alert("Preencha o seu nome")
            } else if (step == 2 && (email == "" || !validateEmail(email))) {
                Alert.alert("verifique o email preenchido")
            } else if (step == 3 && (password == "" || passwordConfirm == "")) {
                Alert.alert("Preencha a senha e a confirmação de senha")
            } else if (step == 3 && (password != passwordConfirm)) {
                Alert.alert("As senhas não correspondem")
            } else {
                setStep(step + 1)
            }
        }
    }

    useEffect(() => {
        props.error != null && Alert.alert(props.error)
    }, [props.error])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
                <Image source={require("../../../assets/home2.jpeg")} style={[styles.image]} />
                <View style={{ flex: 1 }}>
                    <Animatable.View animation="slideInDown" style={{
                        shadowColor: 'black',
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 0.6,
                        shadowRadius: 10,
                        marginTop: 50,
                        backgroundColor: "white",
                        height: 70, width: 70,
                        padding: 10,
                        borderRadius: 60,
                        alignSelf: "center"
                    }}>

                        <Image source={require("../../../assets/logo.png")} style={styles.logo} />
                    </Animatable.View>
                </View>
                {/* <LinearGradient colors={['transparent', 'rgba(0,0,0,.7)', 'black']} style={styles.degrade} /> */}
                <View style={styles.container}>
                    <Animatable.View animation="slideInLeft" adjustsFontSizeToFit style={styles.text}><Text size={18} weight="medium" color="gray">Criação de Conta</Text></Animatable.View>
                    <Animatable.View animation="fadeIn" style={styles.inputs}>
                        {
                            (step == 1 || step == 2) && (
                                <Input
                                    placeholder="Nome"
                                    autoFocus={true}
                                    value={name}
                                    onChange={(text, un) => {
                                        setName(un);

                                        // console.log(text);
                                    }}
                                    keyboardType="numeric"
                                />
                            )
                        }
                        {
                            step == 2 && (
                                <Input
                                    placeholder="Email"
                                    value={email}
                                    onChange={(text, un) => {
                                        setEmail(un);
                                        // console.log(text);
                                    }}
                                />
                            )
                        }

                        {
                            step >= 3 && (
                                <>
                                    <Input
                                        placeholder="Senha"
                                        onChange={(text) => {
                                            setPassword(text);
                                            // console.log(un);
                                        }}
                                        isSecurityText={isSecurityText}
                                        value={password}
                                        icon={!isSecurityText ? "md-eye-outline" : "md-eye-off-outline"}
                                        iconColor="white"
                                        iconAction={() => {
                                            setIsSecurityText(!isSecurityText)
                                        }}
                                    />
                                    <Input
                                        placeholder="Cofirmação de Senha"
                                        onChange={(text) => {
                                            setPasswordConfirm(text);
                                            // console.log(un);
                                        }}
                                        isSecurityText={isSecurityTextConfirm}
                                        value={passwordConfirm}
                                        icon={!isSecurityTextConfirm ? "md-eye-outline" : "md-eye-off-outline"}
                                        iconColor="white"
                                        iconAction={() => {
                                            setIsSecurityTextConfirm(!isSecurityTextConfirm)
                                        }}
                                    />
                                </>
                            )}


                        <Button text={step == 3 ? "Cadastre-se no Choppyfy" : "Próximo"} loading={props.loading} onPress={() => {
                            submit()
                        }} />
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                            <Text color="#b02b4a" style={{ textAlign: "center", marginTop: 20 }}>Ja possuo uma conta</Text>
                        </TouchableOpacity>

                        <View style={styles.rodape}>
                            <View style={{ flex: 3, height: 1, backgroundColor: "#b02b4a" }}></View>
                            <View
                                style={{ flex: 6, alignItems: "center" }}
                            >
                                <Text style={{ color: "#b02b4a", fontSize: scale(14) }}>ou cadastre com</Text>
                            </View>
                            <View style={{ flex: 3, height: 1, backgroundColor: "#b02b4a" }}></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
                                <View style={{ backgroundColor: "white", alignItems: "center", height: 50, width: 50, justifyContent: "center", borderRadius: 100 }}>
                                    <Image source={require("../../../assets/google.png")} style={{ resizeMode: "cover", height: 30, width: 30, borderRadius: 100 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
                                <View style={{ backgroundColor: "#3b579d", height: 50, width: 50, justifyContent: "center", alignItems: "center", borderRadius: 100 }}>
                                    <Image source={require("../../../assets/facebook.png")} style={{ resizeMode: "cover", height: 30, width: 30, borderRadius: 100 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View >
            </>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0ece9",
        flex: 2,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 40

    },
    image: {
        position: "absolute",
        resizeMode: "cover",
        height: "100%",
        width: "100%",
    },
    logo: {
        resizeMode: "contain",
        width: scale(40),
        height: scale(40),
        alignSelf: "center",
    },
    text: {
        fontSize: scale(30),
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30,
        fontWeight: "bold",
        alignSelf: "center"
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
        loading: state.authentication.loadingCadastro,
        error: state.authentication.errorCadastro,
    };
};

export default connect(mapStateToProps)(Register);