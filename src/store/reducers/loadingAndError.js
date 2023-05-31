import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CLEAR_LOADING_ERROR, ERROR, LOADING, SHOW_MESSAGE } from "../actions/loadingAndError";

const initialState =  {
    loading: false,
    message: null,
    count: 0,
    onCloseMessage: () => { 
    }
}

const loadingAndError = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            let counter = action?.loading ? state?.count + 1 : state?.count - 1
            return {
                ...state,
                loading: counter > 0 ? true : false,
                count: counter,
            }
        case ERROR: 
            return {
                ...state,
                message: action?.response?.data?.errors?.first()?.message || action?.response?.data?.message,
                onCloseMessage: action?.onCloseMessage
            }
        case SHOW_MESSAGE: 
            return {
                ...state,
                message: action?.message,
                onCloseMessage: action?.onCloseMessage
            }
        case CLEAR_LOADING_ERROR: 
            return {
                ...state,
                ...initialState
            }
        default:
            return state
    }

}


const persistConfig = {
    key: "loadingAndError",
    blacklist: ['loading', 'message', "count","onCloseMessage"],
    storage: AsyncStorage,
}

export default persistReducer(persistConfig, loadingAndError)
