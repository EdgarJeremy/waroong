import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

export default {
    invalidRequestMessage: (err) => {
        if (err.response) {
            if (err.response.data) {
                if (err.response.data.message) {
                    if (err.response.data.message.errors && err.response.data.message.errors.length) {
                        Snackbar.show({
                            title: err.response.data.message.errors.map((error) => error.message).join(',\n'),
                            duration: Snackbar.LENGTH_LONG,
                            // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', err.response.data.message.errors.map((error) => error.message).join(',\n')) }
                        });
                    } else {
                        Snackbar.show({
                            title: err.response.data.message,
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
        } else {
            Snackbar.show({
                title: err.message,
                duration: Snackbar.LENGTH_LONG,
                // action: { title: 'Detail', onPress: () => Alert.alert('Detail Error', err.message) }
            });
        }
    }
}