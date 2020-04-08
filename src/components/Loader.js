import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default class Loader extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>{this.props.text || 'loading...'}</Text>
            </View>
        )
    }

}