import moment from 'moment'
import { NOTIFICATIONS, CREATE_NOTIFICATION, UPDATE_NOTIFICATION } from '../../utils/constants'

export const notifications = (token) => {
    return (dispatch, getState) => {
        dispatch({
            type: NOTIFICATIONS,
            isCall: false,
        })
    }

}

export const createNotifications = (notifications) => {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_NOTIFICATION,
            isCall: false,
            $payload: {
                notifications
            }
        })
    }

}

export const updateNotifications = () => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_NOTIFICATION,
            isCall: false,
            $payload: {
                
            }
        })
    }

}
