import React from 'react';
import { View, ScrollView, Text, ProgressBarAndroid } from 'react-native';
import { Card, Divider, Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import call from 'react-native-phone-call';

const styles = {
    container: {
        // backgroundColor: '#ced6e0',
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

    render() {
        const { stackNavigation, tabNavigation } = this.props;
        return (
            <View>
                <View>
                    <SearchBar placeholder="Cari..." containerStyle={{ backgroundColor: '#f1f2f6', borderTopWidth: 0, borderBottomWidth: 0 }} />
                    <ProgressBarAndroid styleAttr="Horizontal" indeterminate style={{ backgroundColor: 'transparent', position: "absolute", right: 0, left: 0, bottom: -5 }} />
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((u, i) => (
                            <Card key={i}
                                image={{ uri: i % 2 == 0 ? 'http://home.bt.com/images/the-20-best-views-in-the-uk-revealed-136417214455702601-170411144310.jpg' : 'https://media-cdn.tripadvisor.com/media/photo-s/0f/73/e5/c9/amazing-view-of-taal.jpg' }}
                                imageProps={{ resizeMode: 'cover' }}
                                featuredTitle={`Nama Toko ${i + 1}`}
                                featuredSubtitle={`300m`}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 4 }}>
                                        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'center', alignItems: 'flex-end' }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Icon name="heart" color="#e74c3c" size={25} />
                                        </View>
                                    </View>
                                </View>
                                <Divider style={styles.divider} />
                                <Text style={styles.address}>Jl. Gunung Potong, Singkil Satu, Singkil, Kota Manado, Sulawesi Utara</Text>
                                <View style={styles.action}>
                                    <View style={{ flex: 1 }}>
                                        <Button onPress={() => stackNavigation.navigate('StoreDetail')} raised title="DETAIL" backgroundColor="#ff4757" icon={{ name: 'chevron-right' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Button onPress={() => call({ number: '081340234605' })} raised title="HUBUNGI" backgroundColor="#2ecc71" icon={{ name: 'phone' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Button raised title="CHAT" backgroundColor="#3498db" icon={{ name: 'chat' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                    </View>
                                </View>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }

}