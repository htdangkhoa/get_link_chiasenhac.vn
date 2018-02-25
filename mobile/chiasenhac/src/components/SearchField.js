import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

// Redux
import { connect } from 'react-redux'

class SearchField extends Component {
    render() {
        return(
            <View style={styles.container} >
                <Icon name='ios-search' size={19} color="#8E8E93" />
                <TextInput placeholder='Search' placeholderTextColor='#8E8E93' style={styles.textInput} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(142, 142, 142, .12)', 
        borderRadius: 10, 
        paddingLeft: 8, 
        paddingRight: 8, 
        paddingTop: 7, 
        paddingBottom: 7, 
        marginLeft: 16, 
        marginRight: 16, 
        marginTop: 14, 
        marginBottom: 10
    },

    textInput: {
        flex: 1,
        fontSize: 17, 
        marginLeft: 8
    }
})

export default SearchField