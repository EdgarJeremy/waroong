import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar, Card } from 'react-native-elements';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';
import ParallaxPage from '../components/ParallaxPage';
import QuantityInput from '../components/QuantityInput';

const styles = StyleSheet.create({
    headerStyle: { backgroundColor: '#f1f2f6' },
    foregroundContainerStyle: {
        backgroundColor: 'rgba(0,0,0,.4)'
    },
    headerBarStyle: { padding: 10, flex: 1, flexDirection: 'row', justifyContent: 'center' },
    headerParts: {
        flex: 1,
        justifyContent: 'center'
    },
    headerTitle: { textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#333333', textShadowColor: '#f1f2f6', textShadowRadius: 10 },
    headerActions: { flex: 1, flexDirection: 'row' },
    contentContainer: { backgroundColor: '#ffffff', flex: 1 },
    contentTitle: { paddingTop: 15, paddingLeft: 15, fontWeight: 'bold', fontSize: 25 },
    contentSubtitle: { fontSize: 15, paddingLeft: 15 },
    cardContainer: { padding: 0 },
    cardImageContainer: { flex: 1, alignContent: 'stretch', height: 120 },
    cardImage: { flex: 1, height: 120, width: '100%' },
    cardDetailContainer: { flex: 1.5, padding: 12 },
    cardTitle: { flex: 1, fontSize: 16, fontWeight: 'bold' },
    cardActions: { flex: 1, alignItems: 'flex-end', padding: 10 }
})

export default class StoreDetailScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            headerVisibility: false,
            store: props.navigation.state.params.store,
            ready: false,
            products: []
        }
    }

    async componentDidMount() {
        const { store } = this.state;
        const { screenProps: { models } } = this.props;
        const products = await models.Product.collection({
            attributes: ['id', 'name', 'quantity', 'price', 'photo'],
            where: {
                store_id: store.id
            }
        });
        this.setState({ ready: true, products });
    }

    render() {
        const { headerVisibility, store, ready, products } = this.state;
        return (
            <ParallaxPage
                // overlayOpacity={0.4}
                onHeaderSnap={() => {
                    if (!headerVisibility)
                        this.setState({ headerVisibility: true });
                }}
                onHeaderExtend={() => {
                    if (headerVisibility)
                        this.setState({ headerVisibility: false });
                }}
                headerStyle={styles.headerStyle}
                headerImage={{ uri: store.photo }}
                foregroundContainerStyle={styles.foregroundContainerStyle}
                onPressHeaderImage={() => alert('Header tap')}
                renderHeader={() => (
                    <View style={styles.headerBarStyle}>
                        <View style={[styles.headerParts, { alignItems: 'flex-start' }]}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <MaterialIcons name="arrow-back" color={headerVisibility ? '#000000' : '#ffffff'} size={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.headerParts, { alignItems: 'center' }]}>
                            {headerVisibility && (
                                <Text style={styles.headerTitle}>{store.name}</Text>
                            )}
                        </View>
                        <View style={[styles.headerParts, { alignItems: 'flex-end' }]}>
                            <View style={styles.headerActions}>
                                <MaterialCommunityIcons name="heart" color="#e74c3c" size={30} />
                                {/* <MaterialIcons name="chat" color="#2980b9" size={30} /> */}
                            </View>
                        </View>
                    </View>
                )}
                renderContent={() => (
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentTitle}>{store.name}</Text>
                        <Text style={styles.contentSubtitle}>{store.address}</Text>
                        <View style={{ paddingLeft: 15, flexDirection: 'row', paddingTop: 10 }}>
                            <View style={{ marginTop: 5, borderWidth: 2, borderRadius: 5, borderColor: '#2ecc71', padding: 5 }}>
                                <Text style={{ minWidth: 50, textAlign: 'center', color: '#2ecc71' }}>BUKA</Text>
                            </View>
                            <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                                <Text>{store.open} - {store.close}</Text>
                            </View>
                        </View>
                        <View>
                            {!ready ? (
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
                            ) : (
                                    products.rows.map((p, k) => (
                                        <TouchableNativeFeedback key={k}>
                                            <Card flexDirection="row" containerStyle={styles.cardContainer}>
                                                <View style={styles.cardImageContainer}>
                                                    <Image style={styles.cardImage} resizeMode="cover" source={{ uri: p.photo }} />
                                                </View>
                                                <View style={[styles.cardDetailContainer, { alignItems: 'baseline' }]}>
                                                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                                        <Text style={styles.cardTitle}>{p.name}</Text>
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 3 }}>
                                                        <Text>Rp. {p.price}</Text>
                                                        <Text>/pcs</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.cardActions}>
                                                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                                        <MaterialCommunityIcons name="heart" color="#e74c3c" size={25} />
                                                    </View>
                                                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                                        <QuantityInput />
                                                    </View>
                                                </View>
                                            </Card>
                                        </TouchableNativeFeedback>
                                    ))
                                )}

                        </View>
                    </ View>
                )}
            />
        );
    }

}