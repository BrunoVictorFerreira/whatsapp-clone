import moment from 'moment'
import { LOGIN, LOGOUT, VALIDATE_EMAIL, FORGOT_PASSWORD,  CLEAN_ERROR } from '../../utils/constants'

export const logar = (email, password) => {
    return {
        type: LOGIN,
        $payload: {
            url: "login",
            method: "POST",
            body: {
                email,
                password
            },
        }
    }
}
export const register = (name, email, password, password_confirmation) => {
    return {
        type: LOGIN,
        $payload: {
            url: "register",
            method: "POST",
            body: {
                name,
                email,
                password,
                password_confirmation
            },
        }
    }
}
export const validateEmail = (email) => {
    return {
        type: VALIDATE_EMAIL,
        $payload: {
            url: "forgot-password/validate",
            method: "POST",
            body: {
                email
            },
        }
    }
}
export const forgotPassword = (code, password, password_confirmation) => {
    return {
        type: FORGOT_PASSWORD,
        $payload: {
            url: "forgot-password",
            method: "POST",
            body: {
                code,
                password,
                password_confirmation
            },
        }
    }
}

export const logout = (token) => {
    return {
        type: LOGOUT,
        isQL: false,
        $payload: {
            url: "logout",
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
}

export const verifyToken = (token) => {
    return {
        type: VERIFY_TOKEN,
        isQL: false,
        $payload: {
            url: "verify-token",
            method: "POST",
            body: {
                token: `${token}`
            }
        }
    }
}

export const cleanError = () => {
    return {
        type: CLEAN_ERROR
    }
}




