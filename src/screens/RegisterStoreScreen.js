import React from 'react';
import { View, TouchableNativeFeedback, Image } from 'react-native';
import { FormLabel, FormInput, Button, Divider } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

export default class RegisterStoreScreen extends React.Component {

    static navigationOptions = {
        title: 'Tambah Warung'
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            openTimePicker: false,
            closeTimePicker: false,
            openTime: '',
            closeTime: '',
            photo: '',
            address: '',
            location: { type: 'Point', coordinates: [0, 0] }
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                location: { type: 'Point', coordinates: [position.coords.longitude, position.coords.latitude] }
            });
        });
    }

    _handleOpenTimePick(openTime) {
        this.setState({ openTime: moment(openTime).format('HH:mm') }, this._handleOpenTimeCancel);
    }

    _handleOpenTimeCancel() {
        this.setState({ openTimePicker: false });
    }

    _handleCloseTimePick(closeTime) {
        this.setState({ closeTime: moment(closeTime).format('HH:mm') }, this._handleCloseTimeCancel);
    }

    _handleCloseTimeCancel() {
        this.setState({ closeTimePicker: false });
    }

    _triggerOpenTimeModal() {
        this.setState({ openTimePicker: true });
    }

    _triggerCloseTimeModal() {
        this.setState({ closeTimePicker: true });
    }

    _pickPhoto() {
        ImagePicker.showImagePicker({ title: 'Pilih foto warung', cancelButtonTitle: 'Batal', takePhotoButtonTitle: 'Ambil foto', chooseFromLibraryButtonTitle: 'Pilih dari penyimpanan' }, (response) => {
            if (response.didCancel) return;
            if (response.error) {
                alert(response.error);
            } else {
                this.setState({ photo: 'data:image/jpeg;base64,' + response.data });
            }
        });
    }

    async _done() {
        const { name, address, openTime, closeTime, photo, location } = this.state;
        const { navigation, screenProps: { models } } = this.props;
        const { params } = navigation.state;
        this.setState({ loading: true });
        const store = await models.Store.create({
            name,
            address,
            open: openTime,
            close: closeTime,
            photo,
            location: location
        });
        this.setState({ loading: false });
        navigation.goBack();
        params.onDone();
    }

    render() {
        const { name, address, openTime, closeTime, photo, loading } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <FormLabel>Nama Warung</FormLabel>
                <FormInput value={name} placeholder="Isi Nama Warung.." onChangeText={(text) => this.setState({ name: text })} />
                <FormLabel>Alamat Warung</FormLabel>
                <FormInput value={address} placeholder="Isi Alamat Warung.." onChangeText={(text) => this.setState({ address: text })} />
                <FormLabel>Waktu Buka</FormLabel>
                <TouchableNativeFeedback onPress={this._triggerOpenTimeModal.bind(this)}>
                    <View>
                        <FormInput value={openTime} editable={false} placeholder="Isi Waktu Buka.." />
                    </View>
                </TouchableNativeFeedback>
                <FormLabel>Waktu Tutup</FormLabel>
                <TouchableNativeFeedback onPress={this._triggerCloseTimeModal.bind(this)}>
                    <View>
                        <FormInput value={closeTime} editable={false} placeholder="Isi Waktu Tutup.." />
                    </View>
                </TouchableNativeFeedback>
                <FormLabel>Foto Warung</FormLabel>
                {photo ? (
                    <View style={{ margin: 15 }}>
                        <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} resizeMode="cover" />
                    </View>
                ) : null}
                <Button onPress={this._pickPhoto.bind(this)} color="#ff4757" backgroundColor="transparent" icon={{ name: 'photo', size: 20, color: '#ff4757' }} buttonStyle={{ marginTop: 10, borderWidth: 2, borderColor: '#ff4757' }} title="PILIH FOTO" />

                <Divider style={{ margin: 15, backgroundColor: '#bdc3c7' }} />

                <Button loading={loading} disabled={!name || !address || !openTime || !closeTime || !photo} onPress={this._done.bind(this)} icon={{ name: 'save', size: 20 }} backgroundColor="#2ecc71" title="SIMPAN" />


                <DateTimePicker
                    isVisible={this.state.openTimePicker}
                    mode="time"
                    onConfirm={this._handleOpenTimePick.bind(this)}
                    onCancel={this._handleOpenTimeCancel.bind(this)}
                />
                <DateTimePicker
                    isVisible={this.state.closeTimePicker}
                    mode="time"
                    onConfirm={this._handleCloseTimePick.bind(this)}
                    onCancel={this._handleCloseTimeCancel.bind(this)}
                />
            </View>
        )
    }

}