import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SiriusAdapter from '@edgarjeremy/sirius.adapter';
import { Icon } from 'react-native-elements';
import env from './src/env.json';
import Wait from './src/components/Wait';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StoreDetailScreen from './src/screens/StoreDetailScreen';
import PrivateChatScreen from './src/screens/PrivateChatScreen';
import EditAccountScreen from './src/screens/EditAccountScreen';
import RegisterStoreScreen from './src/screens/RegisterStoreScreen';
import RegisterProductScreen from './src/screens/RegisterProductScreen';

const host = env.api_host;
const port = env.api_port;
const adapter = new SiriusAdapter(host, port, AsyncStorage);

class App extends React.Component {

	state = {
		models: null,
		authProvider: null,
		ready: false,
		user: null
	}

	async componentDidMount() {
		const models = await adapter.connect();
		const authProvider = adapter.getAuthProvider();
		let user;
		try {
			user = await authProvider.get();
		} catch(e) {}
		setTimeout(() => {
			this.setState({ models, authProvider, user, ready: true });
		}, 3000);
	}

	render() {
		const { models, authProvider, user, ready } = this.state;
		return (
			ready ? (
				!user ?
					<LoginScreen authProvider={authProvider} onLogin={(user) => this.setState({ user })} /> :
					<Routes screenProps={{ user, models, authProvider }} />
			) : <Wait />
		)
	}

}

const Routes = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			title: "WAROONG",
			headerRight: (
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<TouchableOpacity>
						<View style={{ marginRight: 10 }}>
							<Icon name="notifications" size={30} />
						</View>
					</TouchableOpacity>
				</View>
			)
		})
	},
	StoreDetail: {
		screen: StoreDetailScreen
	},
	RegisterStore: {
		screen: RegisterStoreScreen
	},
	RegisterProduct: {
		screen: RegisterProductScreen
	},
	PrivateChat: {
		screen: PrivateChatScreen
	},
	EditAccount: {
		screen: EditAccountScreen
	},
}, {
	navigationOptions: {
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0,
			backgroundColor: '#f1f2f6'
		}
	}
});

export default App;