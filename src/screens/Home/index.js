import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
  View,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import EmphasisHome from "../../components/EmphasisHome/index";
import Vitrine from "../../components/Vitrine/index";
import VitrineNoticies from "../../components/VitrineNoticies/index";
import Text from "../../components/Text/index";
import Carousel from "../../components/Carousel/index";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authentication";
import { matchs } from "../../store/actions/groups";
import moment from "moment";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";
import { createNotifications } from "../../store/actions/notifications";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

const socket = io("http://192.168.1.102:8081");

// adicionarJogoResponse()
// async function playSound() {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync( require('./../../../assets/sound/notificacao.mp3'));
//     setAudioModeAsync({
//         playsInSilentModeIOS: true,
//   }
//           );
//     setSound(sound);

//     console.log('Playing Sound');
//     await sound.playAsync();
//   }

const Home = (props, { navigation }) => {
  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: StatusBar.currentHeight }]}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{ flex: 1 }}>
          <Text size={35} weight="bold" color="black">
            Chats
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 10.5,
              backgroundColor: "#eeeeee",
              borderRadius: 8,
              height: 40,
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <Ionicons size={20} color="gray" name={"ios-search-outline"} />
            <Text color="gray" style={{ marginLeft: 5 }} size={15}>
              Search
            </Text>
          </View>
          <View style={{ flex: 1.5, alignItems: "center" }}>
            <Ionicons
              size={20}
              color="#0879ef"
              name={"ios-filter"}
              style={{ marginTop: 5 }}
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 6,
            }}
          >
            <Text size={15}>Broadcast Lists</Text>
          </View>
          <View style={{ flex: 6, alignItems: "flex-end" }}>
            <Text size={15}>New Group</Text>
          </View>
        </View>
        <View style={{ flex: 9 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {[
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
              {
                nome: "abc",
                mensagem: "mensagem",
                photo:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA-ubzwwaK-B3rr48nYFK5MkDmZvu4Xpwgw&usqp=CAU",
              },
            ].map((item, key) => (
              <TouchableOpacity style={{ flexDirection: "row", height: 80 }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.photo }}
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                  ></Image>
                </View>
                <View
                  style={{
                    flex: 8,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingTop: 10,
                    paddingLeft: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgray",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text size={16} weight="bold" color="black">
                      {item.nome}
                    </Text>
                    <Text color="gray" size={11}>
                      {item.mensagem}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingTop: 10,
                    paddingLeft: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgray",
                  }}
                >
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Text size={16}>22:07</Text>
                    <View
                      style={{
                        backgroundColor: "#0879ef",
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text color="white">37</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  text: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
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
    loading: state.authentication.loading,
    loadingGroup: state.groups.loading,
    error: state.authentication.error,
    matchs: state.groups.matchs,
    user: state.authentication.user,
  };
};

export default connect(mapStateToProps)(Home);
