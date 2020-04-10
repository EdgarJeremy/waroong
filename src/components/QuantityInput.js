import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default class QuantityInput extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => { }}>
                    <Text>+</Text>
                </TouchableOpacity>
                <Text>123</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
        )
    }

}