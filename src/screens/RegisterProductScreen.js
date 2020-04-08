import React from 'react';
import { View, TouchableNativeFeedback, Image } from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

export default class RegisterProductScreen extends React.Component {

    static navigationOptions = {
        title: 'Tambah Produk'
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            quantity: '',
            price: '',
            photo: ''
        }
    }

    _pickPhoto() {
        ImagePicker.showImagePicker({ title: 'Pilih foto produk', cancelButtonTitle: 'Batal', takePhotoButtonTitle: 'Ambil foto', chooseFromLibraryButtonTitle: 'Pilih dari penyimpanan' }, (response) => {
            if (response.didCancel) return;
            if (response.error) {
                alert(response.error);
            } else {
                this.setState({ photo: 'data:image/jpeg;base64,' + response.data });
            }
        });
    }

    async _done() {
        const { name, quantity, price, photo } = this.state;
        const { navigation, screenProps: { models } } = this.props;
        const { params } = navigation.state;
        this.setState({ loading: true });
        const product = await models.Product.create({
            name,
            quantity,
            price,
            photo,
            store_id: params.store.id
        });
        this.setState({ loading: false });
        navigation.goBack();
        params.onDone();
    }

    render() {
        const { name, quantity, price, photo, loading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <FormLabel>Nama Produk</FormLabel>
                <FormInput value={name} placeholder="Isi Nama Produk.." onChangeText={(text) => this.setState({ name: text })} />
                <FormLabel>Jumlah Tersedia</FormLabel>
                <FormInput value={quantity} placeholder="Isi Jumlah Tersedia.." onChangeText={(text) => this.setState({ quantity: text })} keyboardType="number-pad" />
                <FormLabel>Harga Per Item</FormLabel>
                <FormInput value={price} placeholder="Isi Harga Per Item.." onChangeText={(text) => this.setState({ price: text })} keyboardType="number-pad" />
                <FormLabel>Foto Produk</FormLabel>
                {photo ? (
                    <View style={{ margin: 15 }}>
                        <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} resizeMode="cover" />
                    </View>
                ) : null}
                <Button onPress={this._pickPhoto.bind(this)} color="#ff4757" backgroundColor="transparent" icon={{ name: 'photo', size: 20, color: '#ff4757' }} buttonStyle={{ marginTop: 10, borderWidth: 2, borderColor: '#ff4757' }} title="PILIH FOTO" />

                <Divider style={{ margin: 15, backgroundColor: '#bdc3c7' }} />

                <Button loading={loading} disabled={!name || !photo} onPress={this._done.bind(this)} icon={{ name: 'save', size: 20 }} backgroundColor="#2ecc71" title="SIMPAN" />

            </View>
        )
    }

}