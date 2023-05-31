import React, { useState, useEffect } from "react";
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
import {
  updateNotifications,
} from "../../store/actions/notifications";
import moment from "moment";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";
import Ionicons from "@expo/vector-icons/Ionicons";

const Notificacao = (props, { navigation }) => {
  useEffect(() => {
    props.dispatch(updateNotifications());
  }, []);
  useEffect(() => {
    console.warn(props.notificatios);
  }, [props.notificatios]);

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: StatusBar.currentHeight }]}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 60,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.text,
                { textAlign: "left", marginTop: 20, marginBottom: 20 },
              ]}
              size={16}
              weight="bold"
            >
              {"Notificações"}
            </Text>
          </View>
          <View>
            {props.notifications?.map((item) => (
              <TouchableOpacity>
                {/* {console.warn("item", item)} */}
                <View
                  style={{
                    shadowColor: "rgba(0,0,0,.2)",
                    shadowOffset: { width: -2, height: 6 },
                    shadowOpacity: 0.9,
                    shadowRadius: 2,
                    marginBottom: 20,
                    borderRadius: 15,
                    borderWidth: 0.4,
                    borderColor: "transparent",
                    height: 90,
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: "white",
                  }}
                >
                  {/* {console.warn("imagesState")} */}
                  {/* {console.warn(BRASOES[3].id)} */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      padding: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                        style={{
                          backgroundColor: "#880218",
                          position: "absolute",
                          left: 10,
                          top: 5,
                          marginRight: 5,
                          paddingHorizontal: 5,
                          paddingVetical: 2,
                          borderRadius: 10,
                        }}
                      >
                        <Text size={12} weight="bold" color="white">
                          Lida
                        </Text>
                      </View>

                    <Text
                      size={14}
                      weight="bold"
                      color="gray"
                      style={{ marginRight: 5, marginTop: 15 }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      size={14}
                      weight="medium"
                      color="gray"
                      style={{ marginRight: 5 }}
                    >
                      {item.message}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    backgroundColor: "#f0ece9",
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
    error: state.authentication.error,
    notifications: state.notifications.notifications,
  };
};

export default connect(mapStateToProps)(Notificacao);
