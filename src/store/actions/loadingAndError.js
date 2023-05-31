export const LOADING = "LOADING"
export const ERROR = "ERROR"
export const CLEAR_LOADING_ERROR = "CLEAR_LOADING_ERROR"
export const SHOW_MESSAGE = "SHOW_MESSAGE"

export const changeLoadingState = (loading) => {
    return {
        type: LOADING,
        loading: loading
    }
}

export const onError = (response, onCloseMessage = () => {}) => {
    return {
        type: ERROR, 
        response: response,
        onCloseMessage: onCloseMessage
    }
}


export const showMessage = (message, onCloseMessage = () => {}) => {
    return {
        type: SHOW_MESSAGE,
        message: message,
        onCloseMessage: onCloseMessage
    }
}

export const clear = () => {
    return {
        type: CLEAR_LOADING_ERROR,
    }
}

