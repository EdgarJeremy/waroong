import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = {
    container: { margin: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: '#2ecc71', borderWidth: 2, padding: 5, borderRadius: 10, paddingLeft: 10, paddingRight: 10 },
}

export default class InfoBadge extends React.Component {

    render() {
        const propTintColor = this.props.tintColor ? this.props.tintColor : "#333333";
        const propContainerStyles = this.props.containerStyle ? this.props.containerStyle : {};
        const propText = this.props.text;
        const iconName = this.props.icon;
        return (
            <View style={[styles.container, { borderColor: propTintColor }, propContainerStyles]}>
                <Icon name={iconName} size={15} color={propTintColor} /><Text style={{ color: propTintColor, fontSize: 10 }}> {propText}</Text>
            </View>
        );
    }

}
