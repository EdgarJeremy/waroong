import React from 'react';
import { View, TouchableNativeFeedback, ScrollView, Text } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import _ from 'lodash';

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    avatarOverlayContainer: { borderRadius: 100 },
    avatarContainer: { width: 50, height: 50, marginRight: 10, paddingTop: 0, paddingRight: 0, paddingBottom: 0, borderRadius: 100 },
    avatar: { width: 50, height: 50, padding: 0, borderRadius: 100 },
    wrapperListItem: { padding: 6 },
    title: { fontWeight: 'bold' },
    rightTitle: { fontWeight: 'normal' },
    subtitleContainer: { marginLeft: 10 },
    summary: { fontSize: 13, color: '#bdc3c7' },
    time: { fontSize: 13 }
}

export default class ChatPart extends React.Component {

    render() {
        const { stackNavigation, tabNavigation } = this.props;
        return (
            <View style={styles.container}>
                <SearchBar placeholder="Cari..." containerStyle={{ backgroundColor: '#f1f2f6', borderTopWidth: 0, borderBottomWidth: 0 }} />
                <ScrollView>
                    {_.times(15).map((i, k) => (
                        <TouchableNativeFeedback onPress={() => stackNavigation.navigate('PrivateChat')} key={k}>
                            <ListItem
                                hideChevron
                                roundAvatar
                                avatarOverlayContainerStyle={styles.avatarOverlayContainer}
                                avatarContainerStyle={styles.avatarContainer}
                                avatarStyle={styles.avatar}
                                wrapperStyle={styles.wrapperListItem}
                                avatar={{ uri: 'https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/44533063_562686290826884_7598173544672919552_n.jpg?_nc_cat=105&_nc_ht=scontent.fsub1-1.fna&oh=52e956b8294f026554c9df33ac941d0e&oe=5C69E88B' }}
                                title={`User ${k + 1}`}
                                titleStyle={styles.title}
                                badge={{ value: 3, containerStyle: { backgroundColor: '#2ecc71', borderRadius: 100 } }}
                                rightTitleStyle={styles.rightTitle}
                                subtitle={(
                                    <View style={styles.subtitleContainer}>
                                        <Text style={styles.summary}>Lorem ipsum dolor sit amet consectetur adipiscing...</Text>
                                        <Text style={styles.time}>20:21</Text>
                                    </View>
                                )}
                            />
                        </TouchableNativeFeedback>
                    ))}
                </ScrollView>
            </View>
        )
    }

}