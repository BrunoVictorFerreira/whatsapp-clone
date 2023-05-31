import { LOGIN, REGISTER, LOGOUT, VALIDATE_EMAIL, FORGOT_PASSWORD, VERIFY_TOKEN, CLEAN_ERROR } from "../../utils/constants";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native"

const authentication = (state = {
    user: null,
    token: null,
    loading: false,
    message: null,
    error: null,
    loadingCadastro: false,
    messageCadastro: null,
    errorCadastro: null,
    loadingValidateEmail: false,
    messageValidateEmail: null,
    errorValidateEmail: null,
    loadingForgotPassword: false,
    messageForgotPassword: null,
    errorForgotPassword: null,
}, action) => {

    switch (action.type) {

        //login
        case `${LOGIN}_REQUEST`:
            // console.log("request login", action)
            return {
                ...state,
                loading: true
            }
        case `${LOGIN}_SUCCESS`:
            console.warn("action")
            console.warn(action?.data)
            const data = action?.data
            // console.log("data", data)
            return {
                ...state,
                token: data?.token,
                user: data?.user,
                loading: false
            }
        case `${LOGIN}_FAILURE`:
            // console.log("failure login", action)
            return {
                ...state,
                userInfo: null,
                userToken: null,
                loading: false,
                error: action?.data?.message || action?.data?.error
            }
       
        case `${REGISTER}_REQUEST`:
            // console.log("request REGISTER", action)
            return {
                ...state,
                loadingCadastro: true
            }
        case `${REGISTER}_SUCCESS`:
            const dataRegister = action?.data
            // console.log("data", data)
            return {
                ...state,
                token: dataRegister?.token,
                user: dataRegister?.user,
                loadingCadastro: false
            }
        case `${REGISTER}_FAILURE`:
            // console.log("failure register", action)
            return {
                ...state,
                userInfo: null,
                userToken: null,
                loadingCadastro: false,
                errorCadastro: action?.data?.message || action?.data?.error
            }
        case `${VALIDATE_EMAIL}_REQUEST`:
            // console.log("request VALIDATE_EMAIL", action)
            return {
                ...state,
                loadingValidateEmail: true
            }
        case `${VALIDATE_EMAIL}_SUCCESS`:
            // console.warn("action", action)
            return {
                ...state,
                messageValidateEmail: action?.data?.message,
                loadingValidateEmail: false
            }
        case `${VALIDATE_EMAIL}_FAILURE`:
            // console.log("failure VALIDATE_EMAIL", action)
            return {
                ...state,
                loadingValidateEmail: false,
                errorValidateEmail: action?.data?.message || action?.data?.error
            }
        case `${FORGOT_PASSWORD}_REQUEST`:
            // console.log("request FORGOT_PASSWORD", action)
            return {
                ...state,
                loadingForgotPassword: true
            }
        case `${FORGOT_PASSWORD}_SUCCESS`:
            return {
                ...state,
                messageForgotPassword: action?.data?.message,
                loadingForgotPassword: false
            }
        case `${FORGOT_PASSWORD}_FAILURE`:
            // console.log("failure FORGOT_PASSWORD", action)
            return {
                ...state,
                loadingForgotPassword: false,
                errorForgotPassword: action?.data?.message || action?.data?.error
            }
        case `${LOGOUT}_REQUEST`:
             return {
                ...state,
                loading: true
             }
        case `${LOGOUT}_SUCCESS`:
            // console.warn('action', action)
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
                message: null,
                error: null,
                loadingCadastro: false,
                messageCadastro: null,
                errorCadastro: null,
            }
        case `${LOGOUT}_FAILED`:
            // console.warn('action', action)
            return {
                ...state,
            }
            
        case CLEAN_ERROR:
            return {
                ...state,
                error: null,
                messageCadastro: null,
                errorCadastro: null,
                errorValidateEmail: null,
                messageValidateEmail: null,
                errorForgotPassword: null,
                messageForgotPassword: null,
            }
        default:
            return state
    }

}

const persistConfig = {
    key: "authentication",
    blacklist: ['loading', 'message', "error", 'messageCadastro', 'errorCadastro'],
    storage: AsyncStorage,
}

export default persistReducer(persistConfig, authentication)

