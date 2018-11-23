import React from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity, TouchableNativeFeedback, Alert, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Card, Button, Divider, Icon } from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import session from '../modules/session';
import handler from '../modules/handler';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    heroContainer: {
        flex: 1,
        flexDirection: "row", alignItems: 'center',
        height: 300, padding: 60,
        backgroundColor: '#f1f2f6'
    },
    hero: {
        flex: 1, resizeMode: 'contain',
        width: 150, height: 150
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    bottomLink: {
        alignSelf: 'center',
        marginTop: 10,
        textDecorationLine: 'underline'
    },
    headerControlContainer: { flexDirection: 'row', borderBottomColor: '#eaeaea', borderBottomWidth: 1 },
    controlContainer: { padding: 20, alignItems: 'center' },
    controlText: { fontWeight: 'bold' }
});

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            action: 'login',
            loginData: {
                email: '',
                password: ''
            },
            registerData: {
                name: '',
                email: '',
                phone: '',
                password: ''
            },
            verifyData: {
                email: '',
                code: ''
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
        const { loginData } = this.state;
        const { navigation } = this.props;
        this.setState({ loading: true }, () => {
            session.start(loginData).then((user) => {
                this.setState({ loading: false }, () => {
                    if (user) {
                        console.log(user);
                        navigation.navigate('Home');
                    } else {
                        Snackbar.show({
                            title: 'Login tidak valid. Periksa data login anda',
                            duration: Snackbar.LENGTH_LONG
                        });
                    }
                });
            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    handler.invalidRequestMessage(err);
                });
            });
        });
    }

    _onRegister() {
        const { registerData } = this.state;
        this.setState({ loading: true }, () => {
            session.register(registerData).then((data) => {
                this.setState({ loading: false }, () => {
                    if (data.status) {
                        Snackbar.show({
                            title: 'Registrasi berhasil! Silakan cek inbox email anda dan lakukan verifikasi',
                            duration: Snackbar.LENGTH_SHORT
                        });
                        this.setState({
                            verifyData: {
                                email: registerData.email,
                                code: ''
                            }
                        }, () => this._switch('verify'));
                    } else {
                        Snackbar.show({
                            title: data.message,
                            duration: Snackbar.LENGTH_LONG,
                            // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', data.message), color: 'green' }
                        });
                    }
                });
            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    handler.invalidRequestMessage(err);
                });
            });
        });
    }

    _onVerify() {
        const { verifyData } = this.state;
        this.setState({ loading: true }, () => {
            session.verify(verifyData).then((user) => {
                this.setState({ loading: false }, () => {
                    Snackbar.show({
                        title: 'Verifikasi berhasil! Silakan login',
                        duration: Snackbar.LENGTH_SHORT
                    });
                    this._switch('login');
                });
            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    handler.invalidRequestMessage(err);
                });
            })
        });
    }

    render() {
        const { action, loginData, registerData, verifyData, loading } = this.state;
        return (
            <View style={styles.root}>
                <View style={styles.heroContainer}>
                    <Image style={styles.hero} source={require('../images/logo.png')} />
                </View>
                <View style={{ flex: 5 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerControlContainer}>
                            <View style={{ flex: 1, backgroundColor: action === 'login' ? '#ffffff' : '#f5f5f5' }}>
                                <TouchableNativeFeedback style={{ flex: 1 }} background={TouchableNativeFeedback.Ripple('#ffffff')} onPress={() => this._switch('login')}>
                                    <View style={styles.controlContainer}>
                                        <Icon name="login-variant" type="material-community" /><Text style={styles.controlText}>MASUK</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={{ flex: 1, backgroundColor: action === 'register' ? '#ffffff' : '#f5f5f5' }}>
                                <TouchableNativeFeedback style={{ flex: 1 }} background={TouchableNativeFeedback.Ripple('#ffffff')} onPress={() => this._switch('register')}>
                                    <View style={styles.controlContainer}>
                                        <Icon name="account-details" type="material-community" /><Text style={styles.controlText}>DAFTAR</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={{ flex: 1, backgroundColor: action === 'verify' ? '#ffffff' : '#f5f5f5' }}>
                                <TouchableNativeFeedback style={{ flex: 1 }} background={TouchableNativeFeedback.Ripple('#ffffff')} onPress={() => this._switch('verify')}>
                                    <View style={styles.controlContainer}>
                                        <Icon name="account-check" type="material-community" /><Text style={styles.controlText}>VERIFIKASI</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ padding: 10 }}>
                                {action === 'login' ?
                                    (
                                        <View>
                                            <FormLabel>Email</FormLabel>
                                            <FormInput value={loginData.email} onChangeText={(value) => this._dataChange('loginData', 'email', value)} placeholder="Email anda" textContentType="emailAddress" />
                                            <FormLabel>Password</FormLabel>
                                            <FormInput value={loginData.password} onChangeText={(value) => this._dataChange('loginData', 'password', value)} secureTextEntry={true} placeholder="Password anda" />
                                            <Divider style={styles.divider} />
                                            <Button raised disabled={loading} loading={loading} onPress={this._onLogin.bind(this)} title={!loading ? 'MASUK' : ''} backgroundColor="#ff4757" large />
                                        </View>
                                    ) :
                                    (
                                        (action === 'register') ?
                                            (
                                                <View>
                                                    <FormLabel>Nama Lengkap</FormLabel>
                                                    <FormInput value={registerData.name} onChangeText={(value) => this._dataChange('registerData', 'name', value)} placeholder="Nama Lengkap anda" />
                                                    <FormLabel>Email</FormLabel>
                                                    <FormInput value={registerData.email} onChangeText={(value) => this._dataChange('registerData', 'email', value)} placeholder="Email anda" textContentType="emailAddress" keyboardType="email-address" />
                                                    <FormLabel>Nomor Telefon</FormLabel>
                                                    <FormInput value={registerData.phone} onChangeText={(value) => this._dataChange('registerData', 'phone', value)} placeholder="Nomor telefon anda" textContentType="telephoneNumber" keyboardType="phone-pad" />
                                                    <FormLabel>Password</FormLabel>
                                                    <FormInput value={registerData.password} secureTextEntry={true} onChangeText={(value) => this._dataChange('registerData', 'password', value)} placeholder="Password anda" textContentType="password" />
                                                    <Divider style={styles.divider} />
                                                    <Button raised disabled={loading} loading={loading} title={!loading ? 'DAFTAR' : ''} backgroundColor="#3498db" onPress={this._onRegister.bind(this)} large />
                                                </View>
                                            ) :
                                            (
                                                <View>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormInput value={verifyData.email} onChangeText={(value) => this._dataChange('verifyData', 'email', value)} placeholder="Email anda" textContentType="emailAddress" keyboardType="email-address" />
                                                    <FormLabel>Kode Verifikasi</FormLabel>
                                                    <FormInput value={verifyData.name} onChangeText={(value) => this._dataChange('verifyData', 'code', value)} placeholder="Kode verifikasi (lihat inbox email)" keyboardType="number-pad" maxLength={6} />
                                                    <Divider style={styles.divider} />
                                                    <Button raised disabled={loading} loading={loading} title={!loading ? 'VERIFIKASI' : ''} backgroundColor="#2ecc71" onPress={this._onVerify.bind(this)} large />
                                                </View>
                                            )
                                    )
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }

}