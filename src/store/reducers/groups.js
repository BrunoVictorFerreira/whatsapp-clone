import {
  GROUPS,
  MATCHS,
  TEAMS_FOR_GROUP,
  ALL_TEAMS_FOR_GROUP,
  SUPORTE,
  MENSAGENS_SUPORTE,
  LOGOUT,
} from "../../utils/constants";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const groups = (
  state = {
    loading: null,
    message: null,
    error: null,
    groups: null,
    matchs: null,
    teams_for_groups: null,
    suporte: null,
    mensagens_suporte: null,
    all_teams_for_groups: null,
  },
  action
) => {
  switch (action.type) {
    case `${GROUPS}_REQUEST`:
      return {
        ...state,
        loading: true,
      };
    case `${GROUPS}_SUCCESS`:
      // console.log("action", action)
      return {
        ...state,
        loading: false,
        groups: action?.data?.data?.groups,
      };
    case `${GROUPS}_FAILURE`:
      return {
        ...state,
        loading: false,
      };
    case `${MATCHS}_REQUEST`:
      return {
        ...state,
        loading: true,
      };
    case `${MATCHS}_SUCCESS`:
      // console.log("action", action)
      return {
        ...state,
        loading: false,
        matchs: action?.data?.data?.matchs,
      };
    case `${MATCHS}_FAILURE`:
      return {
        ...state,
        loading: false,
      };
    case `${TEAMS_FOR_GROUP}_REQUEST`:
      return {
        ...state,
        loading: true,
      };
    case `${TEAMS_FOR_GROUP}_SUCCESS`:
      // console.log("action", action)
      return {
        ...state,
        loading: false,
        teams_for_groups: action?.data?.data?.teams_for_group,
      };
    case `${TEAMS_FOR_GROUP}_FAILURE`:
      return {
        ...state,
        loading: false,
      };
    case `${ALL_TEAMS_FOR_GROUP}_REQUEST`:
      return {
        ...state,
        loading: true,
      };
    case `${ALL_TEAMS_FOR_GROUP}_SUCCESS`:
      // console.log("action", action)
      return {
        ...state,
        loading: false,
        all_teams_for_groups: action?.data?.data?.all_teams_for_group,
      };
    case `${ALL_TEAMS_FOR_GROUP}_FAILURE`:
      return {
        ...state,
        loading: false,
      };

    // case `${SUPORTE}_REQUEST`:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case `${SUPORTE}_SUCCESS`:
    //   console.warn("action SUPORTE", action?.data)
    //   return {
    //     ...state,
    //     loading: false,
    //     suporte: action?.data?.id,
    //   };
    // case `${SUPORTE}_FAILURE`:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    case `${MENSAGENS_SUPORTE}_REQUEST`:
      return {
        ...state,
        loading: true,
      };
    case `${MENSAGENS_SUPORTE}_SUCCESS`:
      console.warn("action MENSAGENS_SUPORTE", action?.data)
      return {
        ...state,
        loading: false,
        mensagens_suporte: action?.data?.data?.mensagens_suporte?.mensagens_suporte,
        suporte: {id: action?.data?.data?.mensagens_suporte?.id, operador: action?.data?.data?.mensagens_suporte?.operador},
      };
    case `${MENSAGENS_SUPORTE}_FAILURE`:
      return {
        ...state,
        mensagens_suporte: null,
        suporte: null,
        loading: false,
      };
    case `${LOGOUT}_REQUEST`:
      return {
        ...state,
        loading: true,
      };
    case `${LOGOUT}_SUCCESS`:
      // console.log("action", action)
      return {
        ...state,
        loading: null,
        message: null,
        error: null,
        groups: null,
        matchs: null,
        suporte: null,
        mensagens_suporte: null,
        suporte: null,
        teams_for_groups: null,
        all_teams_for_groups: null,
      };
    case `${LOGOUT}_FAILURE`:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "groups",
  blacklist: ["loading", "message", "error"],
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, groups);
