import React from 'react';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomePart from './parts/HomePart';
import StorePart from './parts/StorePart';
import SettingPart from './parts/SettingPart';
import AccountPart from './parts/AccountPart';
import ChatPart from './parts/ChatPart';

class HomeScreen extends React.Component {
    
    render() {
        return <Routes screenProps={{
            stackNavigation: this.props.navigation
        }} />
    }
}

const Routes = createMaterialTopTabNavigator({
    Home: {
        screen: ({ screenProps, navigation }) => {
            return <HomePart stackNavigation={screenProps.stackNavigation} tabNavigation={navigation} />
        },
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />,
            tabBarLabel: 'Explorasi'
        }
    },
    Store: {
        screen: StorePart,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="store" size={25} color={tintColor} />,
            tabBarLabel: 'Warung Anda'
        }
    },
    Chat: {
        screen: ChatPart,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="chat" size={25} color={tintColor} />,
            tabBarLabel: 'Obrolan'
        }
    },
    Setting: {
        screen: SettingPart,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />,
            tabBarLabel: 'Pengaturan'
        }
    },
    Account: {
        screen: AccountPart,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={25} color={tintColor} />,
            tabBarLabel: 'Akun'
        }
    }
}, {
        tabBarOptions: {
            style: {
                backgroundColor: '#f1f2f6'
            },
            labelStyle: {
                fontSize: 8,
                color: '#333333',
                fontWeight: 'bold'
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