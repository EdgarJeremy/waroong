import React from 'react';
import InfoBadge from '../../components/InfoBadge';
import { View, Text, Image, ScrollView, TouchableNativeFeedback } from 'react-native';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
}

export default class AccountPart extends React.Component {

    componentDidMount() {

    }

    _onLogout() {
        const { stackNavigation } = this.props;
        this.props.onLogout();
    }

    render() {
        const { stackNavigation, tabNavigation, user } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', elevation: 1, backgroundColor: '#f1f2f6', paddingBottom: 15 }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>{user.name}</Text>
                        <Image resizeMode="cover" source={{ uri: user.avatar }}
                            style={{ marginBottom: 10, borderWidth: 0, borderColor: '#ff4757', width: 130, height: 130, borderRadius: 100 }}
                        />
                        <Text style={{ marginBottom: 5, color: '#3498db', textDecorationLine: 'underline', fontWeight: 'bold' }}>{user.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopColor: '#95a5a6', borderTopWidth: 0.3, borderBottomColor: '#95a5a6', borderBottomWidth: 0.3, padding: 10 }}>
                        <InfoBadge text="Warung - 16" icon="store" tintColor="#2ecc71" />
                        <InfoBadge text="Jangaukan - 30" icon="map" tintColor="#3498db" />
                        <InfoBadge text="Rating - 4/5" icon="star" tintColor="#f1c40f" />
                    </View>
                    <View>
                        <TouchableNativeFeedback onPress={() => stackNavigation.navigate('EditAccount')}>
                            <ListItem
                                leftIcon={{ name: 'account-box' }}
                                title="Edit Profil"
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <ListItem
                                leftIcon={{ name: 'lock' }}
                                title="Keamanan"
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <ListItem
                                leftIcon={{ name: 'notifications' }}
                                title="Pemberitahuan"
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <ListItem
                                leftIcon={{ name: 'short-text' }}
                                title="Kebijakan Privasi"
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <ListItem
                                leftIcon={{ name: 'developer-mode' }}
                                title="Hubungi Developer"
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this._onLogout.bind(this)}>
                            <ListItem
                                leftIcon={{ name: 'logout', color: '#e74c3c', type: 'material-community' }}
                                title="Keluar"
                                titleStyle={{ color: '#e74c3c' }}
                                chevronColor="#e74c3c"
                            />
                        </TouchableNativeFeedback>
                    </View>
                </ScrollView>
            </View>
        )
    }

}