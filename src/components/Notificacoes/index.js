import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "react-native-size-matters";
import Text from "../../components/Text/index";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { BRASOES } from "../../utils/brasoes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifications } from "../../store/actions/notifications";
import { connect } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";
import LottieView from "lottie-react-native";

const Notificacoes = (props) => {
  const navigation = useNavigation();
  const [notificationsState, setNotificationsState] = useState([]);
  const animation = useRef(null);

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
  });

  useEffect(() => {
    console.warn("props");
    console.warn(props);
    var array = [];
    props.notifications != null &&
      props.notifications
        ?.filter((item) => item.status == 0)
        ?.map((item) => {
          array.push(item);
        });
    setNotificationsState(array);
    // props?.notifications?.length > 0 && playSound()
    // AsyncStorage.getItem('notifications').then((value) => {
    //     var parse = JSON.parse(value)
    //     setNotifications(parse)
    // })
  }, [props.notifications]);

  useEffect(() => {
    notificationsState?.length == 0 || notificationsState == null
      ? animation.current?.pause()
      : animation.current?.play();
  }, [notificationsState]);

  // useEffect(() => {
  //    console.warn("notifications")
  //    console.warn(notifications)
  // }, [notifications])
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        hitslop={{ top: 150, bottom: 150, right: 150, left: 150 }}
        style={{ marginRight: 20, marginTop: 10 }}
        onPress={() => {
          navigation.navigate("Notificacoes");
        }}
      >
        <Ionicons
          name={"ios-camera-outline"}
          size={25}
          color={"#0879ef"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        hitslop={{ top: 150, bottom: 150, right: 150, left: 150 }}
        style={{ marginRight: 20, marginTop: 10 }}
        onPress={() => {
          navigation.navigate("Notificacoes");
        }}
      >
        <Ionicons
          name={"ios-pencil-outline"}
          size={20}
          color={"#0879ef"}

        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    notifications: state.notifications.notifications,
  };
};

export default connect(mapStateToProps)(Notificacoes);
