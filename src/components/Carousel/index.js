import React, { useEffect, useState, useRef, useCallback } from 'react'
import Text from "../Text"
import { View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import VitrineNoticies from '../VitrineNoticies/index';
import Groups from "../Groups/index"
import Ionicons from '@expo/vector-icons/Ionicons';

const SLIDER_WIDTH = Dimensions.get("window").width
const ITEM_WIDTH = SLIDER_WIDTH * 0.10

function Slide({ data, props, index, setIndex }) {
    const { item } = data
    if (props.vitrineNoticies) {
        return <VitrineNoticies option={item} index={index + 1} />
    } else if (props.groups) {
        return <View>
            <Groups option={item} index={index + 1} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                {
                    props.options?.map(item => {
                        return <View style={{ width: 10, height: 10, backgroundColor: (index + 1) == item.id ? "white" : "#606060", borderRadius: 5, marginRight: 10 }}>
                        </View>
                    })
                }
            </View>
        </View>
    } else {
        return <Text>abc</Text>
    }
}

export default function Carousel(props) {
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        const distance = Math.abs(roundIndex - index);
        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            props.callbackParent && props.callbackParent(roundIndex)
            setIndex(roundIndex);
        }
    }, []);

    return (
        <FlatList
            data={props.options}
            renderItem={(item) => <Slide index={index} data={item} props={props} />}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            style={{ flex: 1 }}
        />

    );
};