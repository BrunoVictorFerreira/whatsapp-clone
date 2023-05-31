import React, { useState, useEffect } from "react"
import { StyleSheet, Image, View, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import IfComponent from "../../components/IfComponent/index"
import Box from "../../components/Box/index"
import Text from "../../components/Text/index"
import { connect } from "react-redux";
import { groups, matchs, allTeamsForGroup } from '../../store/actions/groups';
import { scale } from 'react-native-size-matters';
import Carousel from "../../components/Carousel/index"

const Ranking = (props) => {

    const [loading, setLoading] = useState(false)
    const [indexState, setIndexState] = useState(0)
    const [matchsState, setMatchsState] = useState(null)

    useEffect(() => {
        props.dispatch(allTeamsForGroup(props.token))
        props.dispatch(matchs(props.token));
    }, [])
    useEffect(() => {
        setLoading(true)
        setMatchsState(props.matchs?.filter(item => item.first_team_description[0].group_id == (indexState + 1)))
        setLoading(false)
    }, [indexState])

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView>
                <View style={{
                    flex: 1,
                    backgroundColor: "#ac1b3a", padding: 20, flexDirection: "row"
                }}>
                    <Carousel callbackParent={(index) => setIndexState(index)} options={props?.all_teams_for_groups}
                        groups
                    />
                </View>
                <Box
                    loading={loading}
                    option={props?.all_teams_for_groups?.[indexState]}
                    games={matchsState}
                />
            </ScrollView>

        </SafeAreaView>
    );
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
        all_teams_for_groups: state.groups.all_teams_for_groups,
        groups: state.groups.groups,
        matchs: state.groups.matchs,
    };
};

export default connect(mapStateToProps)(Ranking);