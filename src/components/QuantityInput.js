import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputButton: {
        backgroundColor: '#dddddd',
        width: 30,
        height: 30,
        padding: 5,
        borderRadius: 100
    },
    inputButtonText: { textAlign: 'center', fontWeight: 'bold' },
    value: { paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderTopWidth: 1, borderTopColor: '#dddddd', borderBottomWidth: 1, borderBottomColor: '#dddddd' }
});

export default class QuantityInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue ? props.defaultValue : 0
        }
    }

    onChange(type) {
        const { maxValue } = this.props;
        if (type === 'add') {
            if (this.state.value + 1 > maxValue) return;
            this.setState({ value: this.state.value + 1 }, () => this.props.onChange && this.props.onChange(this.state.value));
        } else {
            if (this.state.value - 1 < 0) return;
            this.setState({ value: this.state.value - 1 }, () => this.props.onChange && this.props.onChange(this.state.value));
        }
    }

    render() {
        const { value } = this.state;
        const { maxValue } = this.props;
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                <TouchableOpacity disabled={value === 0} style={styles.inputButton} onPress={() => this.onChange('sub')}>
                    <Text style={styles.inputButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.value}>{value}</Text>
                <TouchableOpacity disabled={value >= maxValue} style={styles.inputButton} onPress={() => this.onChange('add')}>
                    <Text style={styles.inputButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

}