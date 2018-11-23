import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StoreDetailScreen from './src/screens/StoreDetailScreen';
import AddStoreScreen from './src/screens/AddStoreScreen';
import PrivateChatScreen from './src/screens/PrivateChatScreen';
import EditAccountScreen from './src/screens/EditAccountScreen';

class App extends React.Component {

	render() {
		return (
			<Routes />
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
	AddStore: {
		screen: AddStoreScreen
	},
	PrivateChat: {
		screen: PrivateChatScreen
	},
	EditAccount: {
		screen: EditAccountScreen
	},
	Login: {
		screen: LoginScreen
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