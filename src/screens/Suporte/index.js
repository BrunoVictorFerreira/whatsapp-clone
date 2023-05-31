import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import IfComponent from "../../components/IfComponent/index";
import Box from "../../components/Box/index";
import Text from "../../components/Text/index";
import { connect } from "react-redux";
import {
  groups,
  matchs,
  allTeamsForGroup,
  suporte,
  CREATE_SUPORTE,
  mensagensSuporte,
} from "../../store/actions/groups";
import { scale } from "react-native-size-matters";
import Carousel from "../../components/Carousel/index";
import Formation from "../../components/Formation";
import { BRASOES } from "../../utils/brasoes";
import moment from "moment";
import { TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import io from "socket.io-client";
import Input from "../../components/Input/index";
import { Audio } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";
import { useMutation, useQuery } from "@apollo/client";
import { SUPORTE } from "../../utils/constants";

const socket = io("http://192.168.1.102:8081");

async function playSound() {
  // console.warn('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(
    require("./../../../assets/sound/notificacao.mp3")
  );
  setAudioModeAsync({
    playsInSilentModeIOS: true,
  });

  // console.log('Playing Sound');
  await sound.playAsync();
}

const Suporte = (props) => {
  const [loading, setLoading] = useState(false);
  const [indexState, setIndexState] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [selected, setSelected] = useState(1);
  const [matchsState, setMatchsState] = useState(null);
  const [message, setMessage] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const scrollRef = useRef(null);

  const [createSuporte] = useMutation(CREATE_SUPORTE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    props.dispatch(mensagensSuporte(props.token, props?.user?.id));
  }, []);

  useEffect(() => {
    console.warn("props.mensagens_suporte");
    console.warn(props.mensagens_suporte);
    if (props?.mensagens_suporte?.length > 0) {
      setMensagens("");
      var array = [];
      props?.mensagens_suporte?.map((item) => {
        array.push({
          message: item.mensagem,
          id: item?.usuario_id,
          usuario:
            item?.usuario_id == props?.user?.id
              ? props.user.name
              : props?.suporte?.operador?.name,
          tipo: item?.usuario_id == props?.user?.id ? "Usuario" : "Operador",
          date: item.created_at,
        });
      });
      setMensagens(array);
    }
  }, [props.mensagens_suporte]);

  socket.on("enviar_mensagem_response", (data) => {
    props.dispatch(mensagensSuporte(props.token, props?.user?.id));
  });

  const compareDatas = (date) => {
    var agora = moment().subtract(3, "hours");
    var dateApi = moment(date).subtract(3, "hours");

    if (agora < dateApi) {
      return moment(dateApi).format("DD/MM/YYYY HH:mm");
    } else if (agora >= dateApi) {
      var addHour = moment(dateApi).add("2", "hours");
      if (addHour < agora) {
        return "Finalizado";
      } else {
        return "Ao Vivo";
      }
    }
  };

  const sendMessage = () => {
    if (message != "") {
      // var array = [...mensagens];
      // array.push({
      //   message: message,
      //   id: props?.user?.id,
      //   usuario: "Bruno",
      //   tipo: "Usuario",
      //   date: moment().format("DD/MM/YYYY HH:mm"),
      // });
      // setMensagens(array);
      createSuporte({
        variables: {
          usuario_id: props?.user?.id,
          mensagem: message,
          suporte_id: props?.suporte == null ? null : props?.suporte?.id,
        },
      })
        .then((resp) => {
          // props.dispatch(suporte(resp?.data?.create_suporte));
          socket.emit('enviar_mensagem', resp.data.create_suporte)
          props.dispatch(mensagensSuporte(props.token, props?.user?.id));
          console.log("resp", resp);
          // })
        })
        .catch(() => {});
      // props.dispatch(suporte(props.token, props?.user?.id, message))
      // socket.emit("enviar_mensagem", {
      //   message: message,
      //   id: props?.user?.id,
      //   usuario: props?.user?.name,
      //   tipo: "Usuario",
      //   date: moment().format("DD/MM/YYYY HH:mm"),
      // });
      setMessage("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Preencha a mensagem!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const myMessage = (item) => {
    return (
      <View style={{ alignItems: "flex-end" }}>
        <View
          style={{
            backgroundColor: "#ac1b3a",
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingBottom: 30,
            marginBottom: 20,
            alignItems: "flex-start",
            alignContent: "flex-end",
            width: "80%",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "white",
            }}
          >
            <Text weight="bold">{item.usuario}</Text>
          </View>
          <Text
            size={10}
            weight="normal"
            color="white"
            style={{ position: "absolute", right: 10, bottom: 10 }}
          >
            {item.date}
          </Text>
          <Text weight="normal" color="white">
            {item.message}
          </Text>
        </View>
      </View>
    );
  };
  const otherMessage = (item) => {
    return (
      <View style={{ alignItems: "flex-start" }}>
        <View
          style={{
            backgroundColor: "#ac1b3a",
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingBottom: 30,
            marginBottom: 20,
            borderRadius: 20,
            alignItems: "flex-start",
            width: "80%",
          }}
        >
          <View
            style={{
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "white",
            }}
          >
            <Text weight="bold">{item.usuario}</Text>
          </View>
          <Text
            size={10}
            weight="normal"
            style={{ position: "absolute", right: 10, bottom: 10 }}
          >
            {item.date}
          </Text>
          <Text weight="normal">{item.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          flex: 1,
          // paddingHorizontal: 20,
          // paddingTop: 20,
          // paddingBottom: 60,
        }}
      >
        <View
          style={{
            flex: 2,
            backgroundColor: "#ac1b3a",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: props?.route?.params?.user?.photo }}
            style={[styles.logo, { borderRadius: 100, height: 48, width: 48 }]}
          />
          <Text weight="bold">Bruno</Text>
        </View>

        <View style={{ flex: 10, padding: 20 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 70 }}
            ref={scrollRef}
            onContentSizeChange={() => scrollRef.current.scrollToEnd()}
          >
            {mensagens?.length > 0 &&
              mensagens?.map((item, key) =>
                item.tipo == "Usuario" ? myMessage(item) : otherMessage(item)
              )}
            {/* <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
            }}
          > */}

            {/* <TextInput
              multiline={true}
              numberOfLines={2}
              placeholder="Digite aqui sua mensagem..."
              onChangeText={(value) => {
                setMessage(value);
              }}
              style={{
                backgroundColor: "lightgray",
                width: "100%",
                flex: 12,
              }}
              onSubmitEditing={Keyboard.dismiss}
            /> */}
            {/* <TouchableOpacity
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                sendMessage();
              }}
            >
              <Ionicons name="ios-send" size={25} color="#ac1b3a" />
            </TouchableOpacity>
          </View> */}
          </ScrollView>
          <View
            style={{
              position: "absolute",
              width: "100%",
              alignSelf: "center",
              bottom: 0,
            }}
          >
            <Input
              placeholder="Digite aqui sua mensagem..."
              value={message}
              onChange={(text, un) => {
                setMessage(text);
              }}
              iconAction={() => {
                sendMessage();
              }}
              icon={"ios-send"}
              iconColor="#b02b4a"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fafafa",
  },
  logo: {
    resizeMode: "cover",
    width: scale(70),
    height: scale(50),
    // alignSelf: "center",
    borderRadius: 10,
  },
  image: {
    position: "absolute",
    resizeMode: "cover",
    height: "80%",
    width: "80%",
    top: 40,
    zIndex: 0,
  },

  degrade: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "90%",
    zIndex: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    all_teams_for_groups: state.groups.all_teams_for_groups,
    groups: state.groups.groups,
    matchs: state.groups.matchs,
    suporte: state.groups.suporte,
    mensagens_suporte: state.groups.mensagens_suporte,
    user: state.authentication.user,
  };
};

export default connect(mapStateToProps)(Suporte);
