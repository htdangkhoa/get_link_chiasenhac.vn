import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ElevatedView from 'react-native-elevated-view'
import { material } from 'react-native-typography'
import { iOSUIKit, iOSColors } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons'

class ListItem extends Component {
    render() {
        return(
            <ElevatedView elevation={24} style={styles.container} >
                <View style={styles.leftContainer} >
                    <Text style={styles.title} numberOfLines={1} >Stranger Things (Alan Walker Remix)</Text>
                    <Text style={styles.artist} >Kygo; OneRepublic</Text>
                    <View style={styles.qualityContainer} >
                        <View style={styles.qualityTextContainer} >
                            <Text style={styles.qualityText} >320kbps</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Icon name='ios-more' size={22} color="black" style={styles.rightIcon} />
                </TouchableOpacity>
                
            </ElevatedView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: 'white', 
        padding: 16, 
        marginTop: 12, 
        marginBottom: 12, 
        marginLeft: 16, 
        marginRight: 16, 
        borderRadius: 10,
        alignItems: 'center'
    },

    leftContainer: {
        flex: 1,
        marginRight: 8
    },

    rightIcon: {
        marginLeft: 8
    },

    title: {
        ...iOSUIKit.bodyEmphasizedObject,
        marginBottom: 4
    },

    artist: {
        ...iOSUIKit.subheadObject,
        marginBottom: 8
    },

    qualityContainer: {
        flexDirection: 'row'
    },

    qualityTextContainer: {
        borderRadius: 30, 
        backgroundColor: iOSColors.red, 
        paddingTop: 3, 
        paddingBottom: 3, 
        paddingLeft: 12, 
        paddingRight: 12
    },

    qualityText: {
        ...iOSUIKit.footnoteEmphasizedObject,
        color: iOSColors.white
    }
})

export default ListItem