import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import IfComponent from "../../components/IfComponent/index";
import Box from "../../components/Box/index";
import Text from "../../components/Text/index";
import { connect } from "react-redux";
import { groups, matchs, allTeamsForGroup } from "../../store/actions/groups";
import { scale } from "react-native-size-matters";
import Carousel from "../../components/Carousel/index";
import Formation from "../../components/Formation";
import { BRASOES } from "../../utils/brasoes";
import moment from "moment";

const GameDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const [indexState, setIndexState] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(1);
  const [selected, setSelected] = useState(1);
  const [matchsState, setMatchsState] = useState(null);
  useMemo(() => {
    // props.dispatch(allTeamsForGroup(props.token))
    // props.dispatch(matchs(props.token));
    console.warn("props");
    console.warn(props?.route?.params);
  }, []);

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

  // useEffect(() => {
  //     setLoading(true)
  //     setMatchsState(props.matchs?.filter(item => item.first_team_description[0].group_id == (indexState + 1)))
  //     setLoading(false)
  // }, [indexState])

  const TimeLine = () => {
    return (
      <View
        style={{ flexDirection: "column", padding: 20, alignItems: "center" }}
      >
        <IfComponent hidden={props?.route?.params?.historic?.length != []}>
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text weight="bold" color="#ac1b3a">
              Sem informação no momento!
            </Text>
          </View>
        </IfComponent>

        <IfComponent hidden={props?.route?.params?.historic?.length == []}>
          <View style={{ height: 20, alignItems: "center", marginBottom: 20 }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#ac1b3a",
                borderRadius: 5,
              }}
            ></View>
            <View
              style={{ width: 1, height: "100%", backgroundColor: "#ac1b3a" }}
            ></View>
          </View>
          {props?.route?.params?.historic?.reverse()?.map((item, key) => (
            <>
              <View
                key={key}
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",

                  borderWidth: 0.2,
                  borderColor: "#ac1b3a",
                  borderRadius: 10,

                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    paddingVertical: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                    backgroundColor: "#ac1b3a",
                    borderTopStartRadius: 10,
                    borderBottomStartRadius: 10,
                  }}
                >
                  <View style={{ height: 50, paddingTop: 10 }}>
                    <Image
                      source={BRASOES[props?.route?.params?.firstId - 1]?.url}
                      style={{
                        resizeMode: "cover",
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        marginLeft: 25,
                      }}
                    />
                    <Image
                      source={BRASOES[props?.route?.params?.secondId - 1]?.url}
                      style={{
                        resizeMode: "cover",
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        marginLeft: 10,
                        marginTop: -20,
                      }}
                    />
                  </View>
                </View>

                <View style={{ flex: 8, paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text size={12} weight="bold" color="#606060">
                      {item.descricao}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#ac1b3a",
                    position: "absolute",
                    right: 10,
                    top: 10,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text size={13} weight="medium" color="white">
                    {moment(item.created_at).format("HH:mm")}
                  </Text>
                </View>
              </View>
              <View
                style={{ height: 0, alignItems: "center", marginBottom: 20 }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#ac1b3a",
                    borderRadius: 5,
                  }}
                ></View>
                <View
                  style={{
                    width: 1,
                    height: "100%",
                    backgroundColor: "#ac1b3a",
                  }}
                ></View>
              </View>
            </>
          ))}
        </IfComponent>
      </View>
    );
  };
  const Jogadores = () => {
    return (
      <View
        style={{ flexDirection: "column", padding: 20, alignItems: "center" }}
      >
        <IfComponent
          hidden={props?.route?.params?.jogadoresFirst?.length != []}
        >
          <View
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text weight="bold" color="#ac1b3a">
              Sem informação no momento!
            </Text>
          </View>
        </IfComponent>

        <IfComponent
          hidden={props?.route?.params?.jogadoresFirst?.length == []}
        >
          <View style={{ height: 20, alignItems: "center", marginBottom: 20 }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: "#ac1b3a",
                borderRadius: 5,
              }}
            ></View>
            <View
              style={{ width: 1, height: "100%", backgroundColor: "#ac1b3a" }}
            ></View>
          </View>
          {console.warn(props?.route?.params?.jogadoresFirst)}
          {(selectedTeam == 1
            ? props?.route?.params?.jogadoresFirst
            : props?.route?.params?.jogadoresSecond
          )?.map((item, key) => (
            <>
              <View
                key={key}
                style={{
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",

                  borderWidth: 0.2,
                  borderColor: "#ac1b3a",
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                {/* <View
                  style={{
                    flex: 2,
                    paddingVertical: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                    backgroundColor: "#ac1b3a",
                    borderTopStartRadius: 10,
                    borderBottomStartRadius: 10,
                  }}
                >
                  <View style={{ height: 50, paddingTop: 10 }}>
                    <Image
                      source={BRASOES[props?.route?.params?.firstId - 1]?.url}
                      style={{
                        resizeMode: "cover",
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        marginLeft: 25,
                      }}
                    />
                    <Image
                      source={BRASOES[props?.route?.params?.secondId - 1]?.url}
                      style={{
                        resizeMode: "cover",
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        marginLeft: 10,
                        marginTop: -20,
                      }}
                    />
                  </View>
                </View> */}

                <View
                  style={{
                    flex: 8,
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{
                        uri:
                          "http://192.168.1.102:8000/storage/" +
                          item?.imagem_jogador?.[0]?.path.replace(
                            "public/",
                            ""
                          ),
                      }}
                      style={{
                        resizeMode: "cover",
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        marginLeft: 10,
                      }}
                    />
                    <Text
                      size={12}
                      weight="bold"
                      style={{ marginLeft: 10 }}
                      color="#606060"
                    >
                      {item.nome} - {item.numero}
                    </Text>
                    {console.warn(item)}
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "#ac1b3a",
                    position: "absolute",
                    right: 10,
                    top: 10,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                  }}
                >
                  <Text size={13} weight="medium" color="white">
                    {moment(item.created_at).format("HH:mm")}
                  </Text>
                </View>
              </View>
              <View
                style={{ height: 0, alignItems: "center", marginBottom: 20 }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "#ac1b3a",
                    borderRadius: 5,
                  }}
                ></View>
                <View
                  style={{
                    width: 1,
                    height: "100%",
                    backgroundColor: "#ac1b3a",
                  }}
                ></View>
              </View>
            </>
          ))}
        </IfComponent>
      </View>
    );
  };
  const Informations = () => {
    return (
      <View style={{ flexDirection: "column", padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          {props?.route?.params?.informacao_partida?.length > 0 ? (
            JSON?.parse(
              props?.route?.params?.informacao_partida?.[0]?.informacoes
            )?.map((item) => (
              <>
                <View
                  style={{
                    flex: 1,
                    marginBottom: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text size={14} color="#ac1b3a" weight="bold">
                    {item?.first_team}
                  </Text>
                  <Text size={14} color="#ac1b3a" weight="bold">
                    {item?.descricao}
                  </Text>
                  <Text size={14} color="#3d4852" weight="bold">
                    {item?.second_team}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 7,
                      marginRight: 10,
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        borderBottomColor: "#ac1b3a",
                        borderBottomWidth: 2,
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          alignSelf: "flex-end",
                          borderTopEndRadius: 0,
                          borderBottomEndRadius: 0,
                          width:
                            (item?.first_team * 100) /
                              (parseInt(item?.first_team) +
                                parseInt(item?.second_team)) +
                            "%",
                          borderRadius: 10,
                          backgroundColor: "#ac1b3a",
                        }}
                      ></View>
                    </View>
                    <View
                      style={{
                        width: "50%",
                        borderBottomColor: "gray",
                        borderBottomWidth: 2,
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          alignSelf: "flex-start",
                          borderTopStartRadius: 0,
                          borderBottomStartRadius: 0,
                          width:
                            (item?.second_team * 100) /
                              (parseInt(item?.first_team) +
                                parseInt(item?.second_team)) +
                            "%",
                          borderRadius: 10,
                          backgroundColor: "gray",
                          borderBottomColor: "gray",
                          borderBottomWidth: 1,
                        }}
                      ></View>
                    </View>
                  </View>
                </View>
              </>
            ))
          ) : (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Text weight="bold" color="#ac1b3a">
                Sem informação no momento!
              </Text>
            </View>
          )}
        </View>

        {/* <View style={{ marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 20, borderWidth: 0.2, borderColor: "#ac1b3a", borderRadius: 10, paddingHorizontal: 10, backgroundColor: "white" }}>
                    <View style={{ flex: 2, height: 50, width: 50 }}>
                        <Image source={require("../../../assets/favicon.png")} style={{ resizeMode: "cover", width: 50, height: 50, borderRadius: 25 }} />
                    </View>
                    <View style={{ flex: 8 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={require("../../../assets/brasoes/brasil.png")} style={{ resizeMode: "cover", width: 15, height: 15, borderRadius: 25, marginRight: 5 }} />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text size={12} color="#606060">Cartão amarelo</Text>
                        </View>

                    </View>
                    <Text style={{ position: "absolute", right: 10, top: 10 }} size={12} weight="medium" color="#606060">48'</Text>
                </View> */}
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#fafafa" }}>
      {/* <Header text="abc" icon="chevron-back" iconStyle={{ fontSize: 20, color: "white" }} /> */}
      <View
        style={{
          flex: 2,
          backgroundColor: "#ac1b3a",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              width: 55,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ac1b3a",
                borderRadius: 50,
                width: 53,
                height: 53,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => setSelectedTeam(1)}>
                <Image
                  source={BRASOES[props?.route?.params?.firstId - 1]?.url}
                  style={[
                    styles.logo,
                    { borderRadius: 100, height: 48, width: 48 },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text>{props?.route?.params?.firstName}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text size={18} weight="bold">
            {props?.route?.params?.result[
              props?.route?.params?.result?.length - 1
            ]?.first_team ?? 0}{" "}
            :{" "}
            {props?.route?.params?.result[
              props?.route?.params?.result?.length - 1
            ]?.second_team ?? 0}
          </Text>
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255,.2)",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          >
            <Text weight="bold" size={12}>
              {compareDatas(props?.route?.params?.date)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                width: 55,
                height: 55,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ac1b3a",
                  borderRadius: 50,
                  width: 53,
                  height: 53,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={() => setSelectedTeam(2)}>
                  <Image
                    source={BRASOES[props?.route?.params?.secondId - 1]?.url}
                    style={[
                      styles.logo,
                      { borderRadius: 100, height: 48, width: 48 },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text>{props?.route?.params?.secondName}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 10, backgroundColor: "#ac1b3a" }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 40,
            backgroundColor: "#fafafa",
            borderTopLeftRadius: 80,
            borderTopRightRadius: 80,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelected(0);
              }}
              style={{
                width: "23%",
                padding: 5,
                borderRadius: 20,
                alignItems: "center",
                backgroundColor: selected == 0 ? "#ac1b3a" : "#eee",
              }}
            >
              <Text color={selected == 0 ? "white" : "gray"} size={12}>
                Informações
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(1);
              }}
              style={{
                width: "23%",
                padding: 5,
                borderRadius: 20,
                alignItems: "center",
                backgroundColor: selected == 1 ? "#ac1b3a" : "#eee",
              }}
            >
              <Text color={selected == 1 ? "white" : "gray"} size={12}>
                Histórico
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(2);
              }}
              style={{
                width: "23%",
                padding: 5,
                borderRadius: 20,
                alignItems: "center",
                backgroundColor: selected == 2 ? "#ac1b3a" : "#eee",
              }}
            >
              <Text color={selected == 2 ? "white" : "gray"} size={12}>
                Formação
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(3);
              }}
              style={{
                width: "23%",
                padding: 5,
                borderRadius: 20,
                alignItems: "center",
                backgroundColor: selected == 3 ? "#ac1b3a" : "#eee",
              }}
            >
              <Text color={selected == 3 ? "white" : "gray"} size={12}>
                Jogadores
              </Text>
            </TouchableOpacity>
          </View>
          {selected == 0 && <Informations />}
          {selected == 1 && <TimeLine />}
          {selected == 3 && <Jogadores />}
          {selected == 2 && <Formation props={props} />}
        </View>
      </View>
    </ScrollView>
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
    alignSelf: "center",
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
  };
};

export default connect(mapStateToProps)(GameDetails);
