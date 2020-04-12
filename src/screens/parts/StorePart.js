import React from 'react';
import { View, Text, ScrollView, ProgressBarAndroid, TouchableNativeFeedback } from 'react-native';
import { Card, Divider, Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../components/Loader';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: '#ced6e0',
        backgroundColor: '#ffffff',
        paddingBottom: 100
    },
    items: {
        width: '50%'
    }
}

export default class StorePart extends React.Component {

    state = {
        ready: false,
        transactionCount: 0,
        products: {
            rows: [],
            count: 0
        }
    }

    async componentDidMount() {
        const { socket } = this.props;
        socket.on('VERIFIED_TRANSACTION', () => {
            this.fetchTransactions();
        });
        await this._fetchProducts();
        await this.fetchTransactions();
        this.setState({ ready: true });
    }

    async _fetchProducts() {
        const { models, user } = this.props;
        if (user.store) {
            this.setState({ ready: false });
            const products = await models.Product.collection({
                attributes: ['id', 'name', 'quantity', 'price', 'photo'],
                where: {
                    store_id: user.store.id
                }
            });
            this.setState({ products, ready: true });
        }
    }

    async fetchTransactions() {
        const { models, user, tabNavigation } = this.props;
        if (user.store) {
            const transactions = await models.Transaction.collection({ distinct: true, attributes: ['id'], where: { verified: true, store_id: user.store.id } });
            this.setState({ transactionCount: transactions.count });
            tabNavigation.setParams({
                transactionCount: transactions.count
            });
        }
    }

    render() {
        const { stackNavigation, tabNavigation, user } = this.props;
        const { ready, products, transactionCount } = this.state;
        return (
            ready ? (
                <View style={{ flex: 1 }}>
                    {/* <View style={{ backgroundColor: '#ffffff', padding: 20 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Toko Anda</Text>
                        <ProgressBarAndroid styleAttr="Horizontal" indeterminate style={{ backgroundColor: 'transparent', position: "absolute", right: 0, left: 0, bottom: -5 }} />
                    </View>
                    <Divider /> */}
                    {user.store ? (
                        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                            <View>
                                <Button title={`TRANSAKSI MASUK${transactionCount ? ` (${transactionCount})` : ''}`} icon={{ name: 'receipt' }} onPress={() => stackNavigation.navigate('Transaction')} />
                            </View>
                            <ScrollView style={{ flex: 1 }}>
                                <View style={styles.container}>
                                    <View style={[styles.items, {
                                        paddingTop: 15,
                                        paddingLeft: 15,
                                        paddingRight: 7.5
                                    }]}>
                                        <TouchableNativeFeedback style={{ flex: 1 }} onPress={() => { stackNavigation.navigate('RegisterProduct', { onDone: this._fetchProducts.bind(this), store: user.store }) }}>
                                            <Card
                                                containerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, margin: 0 }}>
                                                <Icon name="plus-circle-outline" size={100} />
                                            </Card>
                                        </TouchableNativeFeedback>
                                    </View>
                                    {products.rows.map((item, i) => (
                                        <View style={[styles.items, {
                                            paddingTop: 15,
                                            paddingLeft: i % 2 != 0 ? 15 : 7.5,
                                            paddingRight: i % 2 != 0 ? 7.5 : 15
                                        }]} key={i}>
                                            <Card
                                                title={item.name}
                                                containerStyle={{ margin: 0 }}
                                                image={{ uri: item.photo }}
                                                imageProps={{ resizeMode: 'cover' }}
                                                imageStyle={{ height: 100 }}>
                                                <Divider style={styles.divider} />
                                                <View style={styles.action}>
                                                    <View style={{ flex: 1 }}>
                                                        <Button title="ATUR" backgroundColor="#ff4757" icon={{ name: 'settings' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                                    </View>
                                                </View>
                                            </Card>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
                                <Text style={{ textAlign: 'center', marginBottom: 10 }}>Anda belum terdaftar sebagai akun warung. Mulai buat warung anda dengan tap tombol dibawah</Text>
                                <Button title="BUAT WARUNG" backgroundColor="#2ecc71" icon={{ name: 'store' }} onPress={() => { stackNavigation.navigate('RegisterStore', { onDone: this.props.update }) }} />
                            </View>
                        )}
                </View>
            ) : <Loader />
        )
    }

}