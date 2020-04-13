import React from 'react';
import { View, Text, Image, ProgressBarAndroid, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Divider, Button } from 'react-native-elements';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';
import numeral from 'numeral';
import call from 'react-native-phone-call';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class TransactionScreen extends React.Component {

    static navigationOptions = {
        title: 'Transaksi Masuk'
    }

    state = {
        ready: false,
        loading: false,
        transactions: null
    }

    async fetchTransactions() {
        const { screenProps: { models, user } } = this.props;
        this.setState({ ready: false });
        const transactions = await models.Transaction.collection({
            distinct: true,
            attributes: ['id', 'verified', 'status', 'proof', 'created_at'],
            where: {
                store_id: user.store.id,
                verified: true
            },
            include: [{
                model: 'Store',
                attributes: ['id', 'name']
            }, {
                model: 'User',
                attributes: ['id', 'name', 'phone']
            }, {
                model: 'TransactionItem',
                attributes: ['id', 'quantity', 'product_id'],
                include: [{
                    model: 'Product',
                    attributes: ['id', 'name', 'price', 'photo']
                }]
            }],
            order: [['created_at', 'desc']]
        });
        this.setState({ transactions, ready: true });
    }

    componentDidMount() {
        this.fetchTransactions();
    }

    async onProcessOrder(transaction) {
        const { screenProps: { models } } = this.props;
        this.setState({ loading: true });
        await transaction.update({ status: 'process' });
        await this.fetchTransactions();
    }

    render() {
        const { ready, transactions, loading } = this.state;
        return (
            ready ? (
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    {loading ? <ProgressBarAndroid styleAttr="Horizontal" indeterminate style={{ backgroundColor: 'transparent', position: "absolute", right: 0, left: 0, top: -6 }} /> : null}
                    <ScrollView>
                        {transactions.rows.map((t, i) => (
                            <Card
                                key={i}>
                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t.user.name}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <TouchableOpacity style={{ backgroundColor: '#2ecc71', padding: 10, borderRadius: 100 }} onPress={() => call({ number: t.user.phone })}>
                                            <Icon name="phone" color="#ffffff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    {
                                        t.transaction_items.map((l, k) => (
                                            <View key={k} style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#dddddd', padding: 15 }}>
                                                <Image style={{ width: 50, height: 50 }} source={{ uri: l.product.photo }} />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ fontWeight: 'bold' }}>Nama</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>Harga</Text>
                                                    <Text style={{ fontWeight: 'bold' }}>Qty (total)</Text>
                                                </View>
                                                <View style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
                                                    <Text>{l.product.name}</Text>
                                                    <Text>Rp. {numeral(l.product.price).format(',')}</Text>
                                                    <Text style={{ fontWeight: 'bold', color: '#27ae60' }}>x{l.quantity} (Rp. {numeral(l.quantity * l.product.price).format(',')})</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20, color: '#27ae60', fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>{t.transaction_items.reduce((total, item) => total + item.quantity, 0)} item, subtotal Rp. {numeral(t.transaction_items.reduce((total, item) => total + (item.quantity * item.product.price), 0)).format('0,0')}</Text>
                                </View>
                                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                <View>
                                    {
                                        t.status === 'ordered' ? (
                                            <Button onPress={() => this.onProcessOrder(t)} title="PROSES PESANAN" backgroundColor="#3498db" icon={{ name: 'send' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                        ) : (
                                                t.status === 'process' ? (
                                                    <Button loading title="SEDANG DIPROSES" backgroundColor="#f1c40f" containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                                ) : (
                                                        <Button title="SELESAI" backgroundColor="#2ecc71" icon={{ name: 'check' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                                    )
                                            )
                                    }
                                </View>
                            </Card>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                    [1, 1, 1, 1].map((i, k) => (
                        <Card key={k} flexDirection="row">
                            <Placeholder
                                Animation={Fade}
                                Left={PlaceholderMedia}
                            >
                                <PlaceholderLine width={80} />
                                <PlaceholderLine />
                                <PlaceholderLine width={30} />
                            </Placeholder>
                        </Card>
                    ))
                )
        )
    }

}