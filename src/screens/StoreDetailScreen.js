import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ParallaxPage from '../components/ParallaxPage';

export default class StoreDetailScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
        return (
            <ParallaxPage
                // overlayOpacity={0.4}
                headerStyle={{ backgroundColor: '#f1f2f6' }}
                headerImage={{ uri: 'http://home.bt.com/images/the-20-best-views-in-the-uk-revealed-136417214455702601-170411144310.jpg' }}
                renderHeader={() => (
                    <View style={{ padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon name="keyboard-backspace" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TOKO TERSEBUT</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Icon name="heart" color="#e74c3c" size={30} />
                        </View>
                    </View>
                )}
                renderContent={() => {
                    return (
                        <View style={{ height: 1000 }}>
                            <Text>DETAIL WARUNG</Text>
                        </View>
                    )
                }}
            />
        );
    }

}