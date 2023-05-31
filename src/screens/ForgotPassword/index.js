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
import Text from "../../components/Text/index"
import Button from "../../components/Button/index"
import { connect } from "react-redux"
import { validateEmail as validateEmailForgot, forgotPassword, cleanError } from '../../store/actions/authentication';
import validateEmail from "../../utils/validateEmail";
import * as Animatable from 'react-native-animatable';

const ForgotPassword = (props) => {
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("victorbruno221@gmail.com")
    const [isSecurityText, setIsSecurityText] = useState(true)
    const [isSecurityTextConfirm, setIsSecurityTextConfirm] = useState(true)

    const [step, setStep] = useState(1)

    const submit = () => {
        props.dispatch(cleanError())
        if (step == 1 && email != "") {

            if (validateEmail(email)) {
                props.dispatch(validateEmailForgot(email))
            } else {
                Alert.alert("Email inválido")
            }
            return
        }

        if (step == 2 && (code == "")) {
            Alert.alert("Código inválido")
        } else if (step == 2 && (password == "" && passwordConfirm == "")) {
            Alert.alert("Preencha a senha")
        } else if (step == 2 && (password != passwordConfirm)) {
            Alert.alert("As senhas não correspondem")
        } else {
            props.dispatch(forgotPassword(code, password, passwordConfirm))
        }
    }

    useEffect(() => {
        props.errorValidateEmail != null && Alert.alert(props.errorValidateEmail)
    }, [props.errorValidateEmail])
    useEffect(() => {
        if (props.messageValidateEmail != null) {
            Alert.alert(props.messageValidateEmail)
            props.dispatch(cleanError())
            setStep(step + 1)
        }
    }, [props.messageValidateEmail])
    useEffect(() => {
        if (props.message != null) {
            Alert.alert(props.message)
            props.navigation.navigate("Login")
            props.dispatch(cleanError())
        }
    }, [props.message])

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
                    <Animatable.View animation="slideInLeft" adjustsFontSizeToFit style={styles.text}><Text size={18} weight="medium" color="gray">Recuperação de Senha</Text></Animatable.View>
                    <Animatable.View animation="fadeIn" style={styles.inputs}>
                        {
                            (step == 1) && (
                                <Input
                                    placeholder="Email"
                                    value={email}
                                    onChange={(text, un) => {
                                        setEmail(un);
                                        // console.log(text);
                                    }}
                                    leftIcon={"md-mail-open"}
                                    leftIconColor="#b02b4a"
                                />
                            )
                        }

                        {
                            step >= 2 && (
                                <>
                                    <Input
                                        type="custom"
                                        placeholder="Código"
                                        value={code}
                                        mask="999999"
                                        onChange={(text, un) => {
                                            setCode(un);
                                            // console.log(text);
                                        }}
                                        leftIcon={"md-code"}
                                    leftIconColor="#b02b4a"
                                    />
                                    <Input
                                        placeholder="Senha"
                                        onChange={(text) => {
                                            setPassword(text);
                                            // console.log(un);
                                        }}
                                        isSecurityText={isSecurityText}
                                        value={password}
                                        leftIcon={"md-lock-open-outline"}
                                    leftIconColor="#b02b4a"
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
                                        leftIcon={"md-lock-open"}
                                    leftIconColor="#b02b4a"
                                        icon={!isSecurityTextConfirm ? "md-eye-outline" : "md-eye-off-outline"}
                                        iconColor="white"
                                        iconAction={() => {
                                            setIsSecurityTextConfirm(!isSecurityTextConfirm)
                                        }}
                                    />
                                </>
                            )}


                        <Button text={step >= 2 ? "Recuperar Senha" : "Próximo"} loading={props.loading} onPress={() => {
                            submit()
                        }} />

                        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                            <Text color="#b02b4a" style={{ textAlign: "center", marginTop: 20 }}>Ja possuo uma conta</Text>
                        </TouchableOpacity>
                    </Animatable.View >
                </View>
            </>
        </TouchableWithoutFeedback >
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
        loadingValidateEmail: state.authentication.loadingValidateEmail,
        messageValidateEmail: state.authentication.messageValidateEmail,
        errorValidateEmail: state.authentication.errorValidateEmail,
        loading: state.authentication.loadingForgotPassword,
        message: state.authentication.messageForgotPassword,
        error: state.authentication.errorForgotPassword,
    };
};

export default connect(mapStateToProps)(ForgotPassword);