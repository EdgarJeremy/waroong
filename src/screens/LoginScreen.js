import React from 'react';
import { Text, Image, View, ScrollView } from 'react-native';
import { FormLabel, FormInput, Card, Button, Divider } from 'react-native-elements';

const styles = {
    root: {
        flex: 1,
        backgroundColor: '#ff4757'
    },
    heroContainer: {
        flex: 1, flexDirection: "row", alignItems: 'center',
        padding: 60
    },
    hero: {
        flex: 1, resizeMode: 'contain',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    bottomLink: {
        alignSelf: 'center',
        marginTop: 10,
        textDecorationLine: 'underline'
    }
}

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            action: 'login',
            loginData: {
                email: '',
                password: ''
            },
            registerData: {
                fullname: '',
                email: '',
                password: ''
            }
        }
    }

    _switch(action) {
        this.setState({ action });
    }

    _dataChange(type, field, value) {
        let typeState = this.state[type];
        typeState[field] = value;
        this.setState({ [type]: typeState });
    }

    _onLogin() {
        this.props.navigation.replace('Home');
    }

    _onRegister() {

    }

    render() {
        const { action, loginData, registerData } = this.state;
        return (
            <View style={styles.root}>
                <View style={styles.heroContainer}>
                    <Image style={styles.hero} source={require('../images/logo.png')} />
                </View>
                <ScrollView>
                    <View style={{ flex: 4 }}>
                        {action === 'login' ?
                            (
                                <Card>
                                    <FormLabel>Email</FormLabel>
                                    <FormInput value={loginData.email} onChangeText={(value) => this._dataChange('loginData', 'email', value)} placeholder="Email anda" textContentType="emailAddress" />
                                    <FormLabel>Password</FormLabel>
                                    <FormInput value={loginData.password} onChangeText={(value) => this._dataChange('loginData', 'password', value)} secureTextEntry={true} placeholder="Password anda" />
                                    <Divider style={styles.divider} />
                                    <Button onPress={this._onLogin.bind(this)} title="MASUK" backgroundColor="#ff4757" icon={{ name: 'done' }} />
                                    <Text onPress={() => this._switch('register')} style={styles.bottomLink}>Belum punya akun?</Text>
                                </Card>
                            ) :
                            (
                                <Card>
                                    <FormLabel>Nama Lengkap</FormLabel>
                                    <FormInput value={registerData.fullname} onChangeText={(value) => this._dataChange('registerData', 'fullname', value)} placeholder="Nama Lengkap anda" />
                                    <FormLabel>Email</FormLabel>
                                    <FormInput value={registerData.email} onChangeText={(value) => this._dataChange('registerData', 'email', value)} placeholder="Email anda" textContentType="emailAddress" />
                                    <FormLabel>Password</FormLabel>
                                    <FormInput value={registerData.password} secureTextEntry={true} onChangeText={(value) => this._dataChange('registerData', 'password', value)} placeholder="Password anda" />
                                    <Divider style={styles.divider} />
                                    <Button title="DAFTAR" backgroundColor="#3498db" icon={{ name: 'done' }} />
                                    <Text onPress={() => this._switch('login')} style={styles.bottomLink}>Sudah punya akun?</Text>
                                </Card>
                            )}
                    </View>
                </ScrollView>
            </View>
        )
    }

}