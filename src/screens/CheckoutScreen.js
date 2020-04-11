import React from 'react';
import { View, Text, Image, ProgressBarAndroid } from 'react-native';
import { Card, Divider, Button } from 'react-native-elements';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';
import numeral from 'numeral';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CheckoutScreen extends React.Component {

    static navigationOptions = {
        title: 'Transaksi'
    }

    state = {
        ready: false,
        loading: false,
        transactions: null
    }

    async fetchTransactions() {
        const { screenProps: { models } } = this.props;
        this.setState({ ready: false });
        const transactions = await models.Transaction.collection({
            distinct: true,
            attributes: ['id', 'verified', 'status', 'proof', 'created_at'],
            include: [{
                model: 'Store',
                attributes: ['id', 'name', 'photo']
            }, {
                model: 'User',
                attributes: ['id', 'name']
            }, {
                model: 'TransactionItem',
                attributes: ['id', 'quantity', 'product_id'],
                include: [{
                    model: 'Product',
                    attributes: ['id', 'name', 'price', 'photo']
                }]
            }]
        });
        this.setState({ transactions, ready: true });
    }

    componentDidMount() {
        this.fetchTransactions();
    }

    pickPhoto(l) {
        ImagePicker.showImagePicker({ title: 'Pilih foto bukti pembayaran', cancelButtonTitle: 'Batal', takePhotoButtonTitle: 'Ambil foto', chooseFromLibraryButtonTitle: 'Pilih dari penyimpanan' }, async (response) => {
            if (response.didCancel) return;
            if (response.error) {
                alert(response.error);
            } else {
                this.setState({ loading: true });
                await l.update({
                    proof: 'data:image/jpeg;base64,' + response.data
                });
                this.setState({ loading: false });
                this.fetchTransactions();
            }
        });
    }

    render() {
        const { ready, transactions, loading } = this.state;
        return (
            ready ? (
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    {loading ? <ProgressBarAndroid styleAttr="Horizontal" indeterminate style={{ backgroundColor: 'transparent', position: "absolute", right: 0, left: 0, top: -6 }} /> : null}
                    {transactions.rows.map((t, i) => (
                        <Card
                            key={i}
                            image={{ uri: t.store.photo }}
                            imageProps={{ resizeMode: 'cover' }}
                            featuredTitle={t.store.name}>
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
                                    t.proof ? (
                                        t.status === 'ordered' ? (
                                            <Button backgroundColor={t.verified ? '#2ecc71' : '#3498db'} title={t.verified ? 'MENUNGGU PROSES PENJUAL' : 'MENUNGGU VERIFIKASI PEMBAYARAN'} />
                                        ) : (t.status === 'process' ? (
                                            <Text>DIPROSES</Text>
                                        ) : <Text>SELESAI</Text>)
                                    ) : (
                                            <Button onPress={() => this.pickPhoto(t)} raised title="UNGGAH BUKTI PEMBAYARAN" backgroundColor="#3498db" icon={{ name: 'receipt' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                        )
                                }
                            </View>
                        </Card>
                    ))}
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