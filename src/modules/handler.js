import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

export default {
    invalidRequestMessage: (err) => {
        console.log(err.response);
        if (err.response) {
            if (err.response.data) {
                if (err.response.data.errors && err.response.data.errors.length) {
                    Snackbar.show({
                        title: err.response.data.errors.map((error) => error.msg).join(',\n'),
                        duration: Snackbar.LENGTH_LONG,
                        // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', err.response.data.message.errors.map((error) => error.message).join(',\n')) }
                    });
                } else {
                    Snackbar.show({
                        title: 'Terjadi kesalahan',
                        duration: Snackbar.LENGTH_LONG,
                        // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', err.response.data.message) }
                    });
                }
            } else {
                Snackbar.show({
                    title: err.message,
                    duration: Snackbar.LENGTH_LONG,
                    // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', err.message) }
                });
            }
        } else {
            Snackbar.show({
                title: err.message,
                duration: Snackbar.LENGTH_LONG,
                // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', err.message) }
            });
        }
    }
}