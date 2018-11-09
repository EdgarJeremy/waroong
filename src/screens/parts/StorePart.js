import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Card, Divider, Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ced6e0',
        paddingBottom: 100
    },
    items: {
        width: '50%'
    }
}

export default class StorePart extends React.Component {

    render() {
        return (
            <View>
                <SearchBar placeholder="Cari warung..." />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={[styles.items, {
                            paddingTop: 15,
                            paddingLeft: 15,
                            paddingRight: 7.5
                        }]}>
                            <TouchableNativeFeedback style={{flex: 1}} onPress={() => {}}>
                                <Card
                                    containerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, margin: 0 }}>
                                    <Icon name="plus-circle-outline" size={100} />
                                </Card>
                            </TouchableNativeFeedback>
                        </View>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
                            <View style={[styles.items, {
                                paddingTop: 15,
                                paddingLeft: i % 2 != 0 ? 15 : 7.5,
                                paddingRight: i % 2 != 0 ? 7.5 : 15
                            }]} key={i}>
                                <Card
                                    title={`Nama Toko ${i}`}
                                    containerStyle={{ margin: 0 }}
                                    image={{ uri: i % 2 == 0 ? 'http://home.bt.com/images/the-20-best-views-in-the-uk-revealed-136417214455702601-170411144310.jpg' : 'https://media-cdn.tripadvisor.com/media/photo-s/0f/73/e5/c9/amazing-view-of-taal.jpg' }}
                                    imageProps={{ resizeMode: 'cover' }}
                                    imageStyle={{ height: 100 }}>
                                    <Divider style={styles.divider} />
                                    <View style={styles.action}>
                                        <View style={{ flex: 1 }}>
                                            <Button raised title="ATUR" backgroundColor="#ff4757" icon={{ name: 'settings' }} containerViewStyle={{ marginLeft: 0, marginRight: 0 }} />
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }

}