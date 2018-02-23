import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ElevatedView from 'react-native-elevated-view'
import { material } from 'react-native-typography'
import { iOSUIKit } from 'react-native-typography';



class ListItem extends Component {
    render() {
        return(
            <ElevatedView elevation={20} style={styles.container} >
                <Text style={styles.title} >Stranger Things (Alan Walker Remix)</Text>
                <Text style={styles.artist} >Kygo; OneRepublic</Text>
            </ElevatedView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        padding: 8, 
        marginTop: 8, 
        marginBottom: 8, 
        marginLeft: 16, 
        marginRight: 16, 
        borderRadius: 10
    },

    title: {
        ...iOSUIKit.bodyEmphasizedObject,
        marginBottom: 8
    },

    artist: {
        ...iOSUIKit.subheadObject
    }
})

export default ListItem