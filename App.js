import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SiriusAdapter from '@edgarjeremy/sirius.adapter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';
import env from './src/env.json';
import Wait from './src/components/Wait';
import FloatingCounter from './src/components/FloatingCounter';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StoreDetailScreen from './src/screens/StoreDetailScreen';
import PrivateChatScreen from './src/screens/PrivateChatScreen';
import EditAccountScreen from './src/screens/EditAccountScreen';
import RegisterStoreScreen from './src/screens/RegisterStoreScreen';
import RegisterProductScreen from './src/screens/RegisterProductScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import TransactionScreen from './src/screens/TransactionScreen';

const host = env.api_host;
const port = env.api_port;
const adapter = new SiriusAdapter(host, port, AsyncStorage);
const socket = io(`${host}:${port}`);

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
		} catch (e) { }
		setTimeout(() => {
			this.setState({ models, authProvider, user, ready: true });
		}, 3000);
	}

	async onLogout() {
		const { authProvider } = this.state;
		this.setState({ ready: false });
		await authProvider.remove();
		this.setState({ user: null, ready: true });
	}

	async update() {
		const { authProvider } = this.state;
		const user = await authProvider.get();
		this.setState({ user });
	}

	render() {
		const { models, authProvider, user, ready } = this.state;
		return (
			ready ? (
				!user ?
					<LoginScreen authProvider={authProvider} onLogin={(user) => this.setState({ user })} /> :
					<Routes screenProps={{ user, models, authProvider, socket, onLogout: this.onLogout.bind(this), update: this.update.bind(this) }} />
			) : <Wait />
		)
	}

}

const Routes = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => {
			const { params = {} } = navigation.state;
			return ({
				title: "PASOK",
				headerRight: (
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
							<View style={{ marginRight: 10 }}>
								<Icon name="basket" size={30} />
								{params.transactionCount ? <FloatingCounter text={params.transactionCount} /> : null}
							</View>
						</TouchableOpacity>
					</View>
				)
			})
		}
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
	Checkout: {
		screen: CheckoutScreen
	},
	Transaction: {
		screen: TransactionScreen
	}
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