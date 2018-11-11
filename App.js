import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { SearchBar, Badge } from 'react-native-elements';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import StoreDetailScreen from './src/screens/StoreDetailScreen';
import AddStoreScreen from './src/screens/AddStoreScreen';

const App = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			headerLeft: (
				<View></View>
			),
			headerTitle: (
				<View style={{ flex: 1, alignItems: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 20 }}>WAROONG</Text>
				</View>
			),
			headerRight: (
				<TouchableOpacity>
					<Badge
						value={`Notifikasi (3)`}
						containerStyle={{ marginRight: 10, height: 30 }}
						textStyle={{ fontSize: 12 }}
					/>
				</TouchableOpacity>
			)
		}
	},
	StoreDetail: {
		screen: StoreDetailScreen
	},
	AddStore: {
		screen: AddStoreScreen
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