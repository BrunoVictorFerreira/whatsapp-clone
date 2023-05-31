import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { DataTable } from 'react-native-paper';
import moment from 'moment'
import { LinearGradient } from 'expo-linear-gradient';
import { scale } from 'react-native-size-matters';
import Text from "../../components/Text/index"
import IfComponent from "../../components/IfComponent/index"
import { groups, teamsForGroup } from '../../store/actions/groups';
import { connect } from "react-redux";
import Link from "../../components/Link/index"
import Ionicons from "@expo/vector-icons/Ionicons";
import { BRASOES } from "../../utils/brasoes";

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.88

const Box = ({ teams_for_groups, dispatch, token, title, option, games, loading }) => {
    const [openState, setOpenState] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [page, setPage] = useState(1)
    const optionsPerPage = [2, 3, 4];
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    let _carousel = useRef(null)
    _renderItem = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: "red" }}>
                <Text>{item.title}</Text>
            </View>
        );
    }

    const fetchTeams = (group_id) => {
        dispatch(teamsForGroup(group_id, token))
    }

    const RowGame = ({ option }) => {
        // console.log("option")
        // console.log(option)
        return (
            <View style={{ flexDirection: "row", marginTop: 20, paddingHorizontal: 20 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", marginBottom: 5, alignItems: 'center' }}>
                        <View style={{ backgroundColor: "#ac1b3a", marginRight: 5, borderRadius: 20, width: 33, height: 33, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ backgroundColor: "white", borderRadius: 20, width: 32, height: 32, justifyContent: "center" }}>
                                <Image source={BRASOES[option.first_team_description[0].id - 1]?.url} style={[styles.logo, { borderRadius: 100, height: 30, width: 30 }]} />
                            </View>
                        </View>
                        <Text color="#ac1b3a" weight="extrabold" size={16}>{option?.first_team_description[0]?.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <View style={{ backgroundColor: "#ac1b3a", marginRight: 5, borderRadius: 20, width: 33, height: 33, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ backgroundColor: "white", borderRadius: 20, width: 32, height: 32, justifyContent: "center" }}>
                                <Image source={BRASOES[option.second_team_description[0].id - 1]?.url} style={[styles.logo, { borderRadius: 100, height: 30, width: 30 }]} />
                            </View>
                        </View>
                        <Text color="#ac1b3a" weight="extrabold" size={16}>{option?.second_team_description[0]?.name}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "column", borderLeftColor: "lightgray", borderLeftWidth: 1 }}>
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", paddingLeft: 10, paddingTop: 10 }}>
                        <Ionicons color="#ac1b3a" name="calendar" size={12}/>
                        <Text color="#ac1b3a" weight="bold" size={12}>Dia: {moment(option?.date).format("DD/MM/YYYY")}</Text>
                        <Text color="black" weight="bold" size={12}>Às: {moment(option?.date).format("HH:mm")} hrs</Text>
                    </View>
                </View>
            </View>
        )
    }

    const TableGroup = ({ option }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text color="gray" weight="medium" size={16} style={{ textAlign: "center", marginTop: 20 }}>Tabela</Text>

            </View>
        )
    }

    useEffect(()=> {
        console.warn("loading", loading)
    }, [loading])

    return (
        <View style={{ flex: 2, backgroundColor: "#ac1b3a" }}>
            <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fafafa", borderTopLeftRadius: 60, borderTopRightRadius: 60 }}>
                <IfComponent hidden={loading}>
                    <View style={{ flex: 1, borderBottomColor: "lightgray", borderBottomWidth: 1, paddingBottom: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text color="gray" weight="medium" size={18}>Jogos do: <Text color="gray" weight="bold" size={18}>{option?.grupo}</Text></Text>
                    </View>
                    <View style={{ flex: 11 }}>
                        {
                            games?.filter(item => item)?.map(item => {
                                return <RowGame option={item} />
                            })
                        }
                    </View>
                </IfComponent>
                <IfComponent hidden={!loading}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </IfComponent>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: "cover",
        width: scale(70),
        height: scale(50),
        alignSelf: "center",
        borderRadius: 10
    },
    text: {
        color: "red",
        textAlign: "center",
    },
});

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        groups: state.groups.groups,
        teams_for_groups: state.groups.teams_for_groups,
    };
};

export default connect(mapStateToProps)(Box);