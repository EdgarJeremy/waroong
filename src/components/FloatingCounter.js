import React from 'react';
import { View, Text } from 'react-native';

const styles = {
    container: { borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 15, height: 15, position: 'absolute', top: -4, right: -9, backgroundColor: '#e74c3c' },
    text: { fontSize: 10, color: '#ffffff', fontWeight: 'bold' }
}

export default class FloatingCounter extends React.Component {

    render() {
        const { containerStyle, textStyle, text, color } = this.props;
        return (
            <View style={[styles.container, containerStyle, color ? { backgroundColor: color } : {}]}>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
        )
    }

}