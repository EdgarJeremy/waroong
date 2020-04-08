import React from 'react';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FloatingCounter from '../components/FloatingCounter';
import HomePart from './parts/HomePart';
import StorePart from './parts/StorePart';
import AccountPart from './parts/AccountPart';
import ChatPart from './parts/ChatPart';

class HomeScreen extends React.Component {

    static navigationOptions = {
        headerLeft: null
    }

    render() {
        return <Routes screenProps={{
            ...this.props.screenProps,
            stackNavigation: this.props.navigation
        }} />
    }
}

const styles = {
    labelStyle: { fontSize: 8, fontWeight: 'bold', paddingTop: 4, paddingBottom: 4 }
}

const Routes = createMaterialTopTabNavigator({
    Home: {
        screen: ({ screenProps, navigation }) => {
            return <HomePart {...screenProps} stackNavigation={screenProps.stackNavigation} tabNavigation={navigation} />
        },
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
            tabBarLabel: ({ tintColor }) => <Text style={[styles.labelStyle, { color: tintColor }]}>EXPLORASI</Text>
        }
    },
    Store: {
        screen: ({ screenProps, navigation }) => {
            return <StorePart {...screenProps} stackNavigation={screenProps.stackNavigation} tabNavigation={navigation} />
        },
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="store" size={25} color={tintColor} />,
            tabBarLabel: ({ tintColor }) => <Text style={[styles.labelStyle, { color: tintColor }]}>WARUNG ANDA</Text>
        }
    },
    Chat: {
        screen: ({ screenProps, navigation }) => {
            return <ChatPart {...screenProps} stackNavigation={screenProps.stackNavigation} tabNavigation={navigation} />
        },
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                    <Icon name="chat" size={25} color={tintColor} />
                    <FloatingCounter text={4} />
                </View>
            ),
            tabBarLabel: ({ tintColor }) => <Text style={[styles.labelStyle, { color: tintColor }]}>OBROLAN</Text>
        }
    },
    Account: {
        screen: ({ screenProps, navigation }) => {
            return <AccountPart {...screenProps} stackNavigation={screenProps.stackNavigation} tabNavigation={navigation} />
        },
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={25} color={tintColor} />,
            tabBarLabel: ({ tintColor }) => <Text style={[styles.labelStyle, { color: tintColor }]}>AKUN</Text>
        }
    }
}, {
    tabBarOptions: {
        style: {
            backgroundColor: '#f1f2f6'
        },
        pressColor: '#ff4757',
        indicatorStyle: {
            height: 3,
            backgroundColor: '#ff4757'
        },
        showIcon: true,
        activeTintColor: '#ff4757',
        inactiveTintColor: '#333333'
    },
    tabBarPosition: 'bottom'
});

export default HomeScreen;