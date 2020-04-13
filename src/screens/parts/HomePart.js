import React from 'react';
import { View, ScrollView, Text, ProgressBarAndroid } from 'react-native';
import { Card, Divider, Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import call from 'react-native-phone-call';
import env from '../../env.json';
import Loader from '../../components/Loader';

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: 100
    },
    description: {

    },
    divider: {
        marginTop: 5,
        marginBottom: 5
    },
    address: {
        fontSize: 10,
        color: '#a4b0be'
    },
    action: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    }
}

export default class HomePart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            loading: false,
            stores: null
        };
    }

    async componentDidMount() {
        const { models } = this.props;
        navigator.geolocation.getCurrentPosition(async (position) => {
            const stores = await models.Store.collection({
                where: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
            });
            this.setState({ stores, ready: true });
        });
    }

    render() {
        const { stackNavigation } = this.props;
        const { ready, loading, stores } = this.state;
        return (
            ready ? (
                <View style={{ flex: 1 }}>
                    <View>
                        <SearchBar placeholder="Cari..." containerStyle={{ backgroundColor: '#f1f2f6', borderTopWidth: 0, borderBottomWidth: 0 }} />
                        {loading && <ProgressBarAndroid styleAttr="Horizontal" indeterminate style={{ backgroundColor: 'transparent', position: "absolute", right: 0, left: 0, bottom: -5 }} />}
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                        <ScrollView>
                            <View style={styles.container}>
                                {stores.rows.map((s, i) => (
                                    <Card key={i}
                                        image={{ uri: `${env.api_host}:${env.api_port}/pics/store/${s.id}` }}
                                        imageProps={{ resizeMode: 'cover' }}
                                        featuredTitle={s.name}
                                        featuredSubtitle={(() => {
                                            const distance = parseInt(s.distance, 10);
                                            if (distance >= 1000) {
                                                return `${distance / 1000}km`;
                                            } else {
                                                return `${distance}m`;
                                            }
                                        })()}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 4 }}>
                                                <Text style={styles.description}>{(() => {
                                                    const products = s.products;
                                                    const len = products.length;
                                                    if (len === 0) return 'Belum ada item';
                                                    if (len === 1) return products[0].name;
                                                    if (len > 3) {
                                                        let msg = `${products[0].name},${products[1].name},${products[2].name} dan ${len - 3} item lainnya`;
                                                        return msg;
                                                    } else {
                                                        const last = { ...products[len - 1] };
                                                        products.splice(len - 1, 1);
                                                        let msg = products.map((p) => p.name).join(',');
                                                        msg += ` dan ${last.name}`;
                                                        return msg;
                                                    }
                                                })()}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignSelf: 'center', alignItems: 'flex-end' }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <Icon name="heart" color="#e74c3c" size={25} />
                                                </View>
                                            </View>
                                        </View>
                                        <Divider style={styles.divider} />
                                        <Text style={styles.address}>{s.address}</Text>
                                        <View style={styles.action}>
                                            <View style={{ flex: 1 }}>
                                                <Button onPress={() => stackNavigation.navigate('StoreDetail', { store: s })} title="DETAIL" backgroundColor="#ff4757" icon={{ name: 'chevron-right' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Button onPress={() => call({ number: s.user.phone })} title="HUBUNGI" backgroundColor="#2ecc71" icon={{ name: 'phone' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                            </View>
                                            {/* <View style={{ flex: 1 }}>
                                                <Button title="CHAT" backgroundColor="#3498db" icon={{ name: 'chat' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                            </View> */}
                                        </View>
                                    </Card>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            ) : <Loader />
        )
    }

}