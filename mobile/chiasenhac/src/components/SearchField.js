import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class SearchField extends Component {
    render() {
        return(
            <View style={styles.container} >
                <View style={styles.textInputContainer} >
                    <Icon name='ios-search' size={19} color="#8E8E93" />
                    <TextInput placeholder='Search' placeholderTextColor='#8E8E93' style={styles.textInput} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: .5, 
        borderBottomColor: '#828282',
    },

    textInputContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'rgba(142, 142, 147, .24)', 
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