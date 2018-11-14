import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StoreDetailScreen from './src/screens/StoreDetailScreen';
import AddStoreScreen from './src/screens/AddStoreScreen';
import PrivateChatScreen from './src/screens/PrivateChatScreen';

const App = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			title: "WAROONG",
			// headerLeft: (
			// 	<View></View>
			// ),
			// headerTitle: (
			// 	<View style={{ flex: 1, alignItems: 'center' }}>
			// 		<Text style={{ fontWeight: 'bold', fontSize: 20 }}>WAROONG</Text>
			// 	</View>
			// ),
			headerRight: (
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<TouchableOpacity>
						<View style={{ marginRight: 10 }}>
							<Icon name="chat" size={30} />
							<View style={{ borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 15, height: 15, position: 'absolute', top: -4, right: -4, backgroundColor: '#e74c3c' }}>
								<Text style={{ fontSize: 10, color: '#ffffff', fontWeight: 'bold' }}>5</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity>
						<View style={{ marginRight: 10 }}>
							<Icon name="notifications" size={30} />
							<View style={{ borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 15, height: 15, position: 'absolute', top: -4, right: -4, backgroundColor: '#e74c3c' }}>
								<Text style={{ fontSize: 10, color: '#ffffff', fontWeight: 'bold' }}>1</Text>
							</View>
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
	Login: {
		screen: LoginScreen
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