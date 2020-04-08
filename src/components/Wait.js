import React from 'react';
import { View, Image, Text } from 'react-native';

export default class Wait extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../images/logo.png')} />
                <Text>by tagconn</Text>
            </View>
        )
    }

}