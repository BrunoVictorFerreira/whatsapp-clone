import { NOTIFICATIONS, CREATE_NOTIFICATION, UPDATE_NOTIFICATION, LOGOUT } from "../../utils/constants";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native"

const notifications = (state = {
    loading:false,
    notifications: null,
}, action) => {

    switch (action.type) {

        case `${NOTIFICATIONS}_SUCCESS`:
            
            return {
                ...state,
                loading: false,
                notifications
            }
        case `${CREATE_NOTIFICATION}_SUCCESS`:
            var notifications = []
            notifications.push({...action.data.notifications, status: 0})
            state?.notifications?.length > 0 && state?.notifications?.map(item => {
                notifications.push({...item})
            })
            return {
                ...state,
                loading: false,
                notifications
            }
        case `${UPDATE_NOTIFICATION}_SUCCESS`:
            var notifications = []
            state?.notifications?.length > 0 && state?.notifications?.map(item => {
                notifications.push({...item, status: 1})
            })
            return {
                ...state,
                loading: false,
                notifications
            }
        case `${LOGOUT}_REQUEST`:
            return {
                ...state,
                loading: true
            }
        case `${LOGOUT}_SUCCESS`:
            // console.log("action", action)
            return {
                ...state,
                loading: false,
                notifications: null,
            }
        case `${LOGOUT}_FAILURE`:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }

}

const persistConfig = {
    key: "notifications",
    blacklist: ['loading'],
    storage: AsyncStorage,
}

export default persistReducer(persistConfig, notifications)

