import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';

import { LinearGradient } from 'expo-linear-gradient';
import { scale } from 'react-native-size-matters';
import Text from "../../components/Text/index"
import IfComponent from "../../components/IfComponent/index"
import { groups, teamsForGroup } from '../../store/actions/groups';
import { connect } from "react-redux";
import Link from "../../components/Link/index"
import {BRASOES} from "../../utils/brasoes"

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.80

const Groups = ({ option, index }) => {
    const optionsPerPage = [2, 3, 4];
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    return (
        <View style={{
            shadowColor: 'rgba(0,0,0,.3)',
            shadowOffset: { width: -2, height: 10 },
            shadowOpacity: 0.9,
            shadowRadius: 10,
            backgroundColor: "#f0ece9",
            borderRadius: 30,
            width: ITEM_WIDTH,
            marginLeft: 23,
            marginRight: 20,
            flexDirection: "column"
        }}>
            <View style={{ flex: 2, borderBottomColor: "lightgray", borderBottomWidth: 1, alignItems: "center", justifyContent: "center" }}>
                <Text color="gray" weight="bold" size={18}>{option?.grupo}</Text>
            </View>
            <View style={{ flex: 10, paddingVertical: 5, paddingHorizontal: 10 }}>
                <DataTable >
                    <DataTable.Header>
                        <DataTable.Title style={{ flex: 4 }}><Text size={10} color="#606060">Equipe</Text></DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}><Text size={10} color="#606060">Pts</Text></DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}><Text size={10} color="#606060">VIT</Text></DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}><Text size={10} color="#606060">EMP</Text></DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}><Text size={10} color="#606060">DER</Text></DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}><Text size={10} color="#606060">GOLS</Text></DataTable.Title>
                        <DataTable.Title numeric style={{ flex: 1 }}><Text size={10} color="#606060">SG</Text></DataTable.Title>
                    </DataTable.Header>
                    {
                        option != null && option?.teams?.map((item, key) => <DataTable.Row style={{ alignItems: "center", justifyContent: "center" }}>
                            {/* {console.log("item")} */}
                            {/* {console.log(item)} */}
                            <DataTable.Cell style={{ flex: 4, alignItems: "center" }}>
                                <Text size={12} color="#606060" weight="bold">{key + 1} - </Text>
                                <Image source={BRASOES[item.id - 1]?.url} style={[styles.logo, { borderRadius: 100, height: 20, width: 20 }]} />
                                <Text size={12} color="#606060" weight="medium" style={{ marginLeft: 15 }}> {item?.name}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}><Text color="#606060" size={12}>{item?.informations[0]?.pts}</Text></DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}><Text color="#606060" size={12}>{item?.informations[0]?.vit}</Text></DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}><Text color="#606060" size={12}>{item?.informations[0]?.emp}</Text></DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}><Text color="#606060" size={12}>{item?.informations[0]?.der}</Text></DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}><Text color="#606060" size={12}>{item?.informations[0]?.gols}</Text></DataTable.Cell>
                            <DataTable.Cell numeric style={{ flex: 1 }}><Text color="#606060" size={12}>{item?.informations[0]?.sg}</Text></DataTable.Cell>
                        </DataTable.Row>)
                    }
                </DataTable>
                {/* {option?.teams?.map(item => {
                        return <View style={{
                            borderRadius: 15,
                            flex: 1,
                            flexDirection: "row",
                           
                        }} >
                            <View style={{ flexDirection: "row", paddingVertical: 10, paddingHorizontal: 3, alignItems: "center" }}>
                                <View style={{ backgroundColor: "#ac1b3a", borderRadius: 20, width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ backgroundColor: "white", borderRadius: 20, width: 21, height: 21, justifyContent: "center" }}>
                                        <Image source={{uri: item?.brasao[0]?.url}} style={[styles.logo, { borderRadius: 100, height: 20, width: 20 }]} />
                                    </View>
                                </View>
                                <Text size={12} weight="bold" color="#ac1b3a" style={{ marginLeft: 10 }}>{item?.name}</Text>
                            </View>
                        </View>
                    })} */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa"
    },
    logo: {
        resizeMode: "cover",
        width: scale(70),
        height: scale(50),
        alignSelf: "center",
        borderRadius: 10
    },
    image: {
        position: "absolute",
        resizeMode: "cover",
        height: "80%",
        width: "80%",
        top: 40,
        zIndex: 0
    },

    degrade: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "90%",
        zIndex: 0
    },
});

const mapStateToProps = state => {
    return {
        token: state.authentication.token,
        groups: state.groups.groups,
        teams_for_groups: state.groups.teams_for_groups,
    };
};

export default connect(mapStateToProps)(Groups);