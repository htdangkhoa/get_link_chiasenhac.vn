import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import shortId from 'shortid'

// Redux
import { connect } from 'react-redux'
import { ON_FETCH_SONG_FROM_SERVER, ON_RE_FETCH_DATA } from '../redux/Action'

class SearchField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    _onChangeText = value => {
        console.log(value)
        this.setState({value})
    }

    _onSubmitEditing = async event => {
        let { dispatch } = this.props

        dispatch({type: ON_RE_FETCH_DATA})

        let dt = []

        let _r = await axios({
            url: 'http://0.0.0.0:9000/search',
            method: 'GET',
            params: {
                q: this.state.value,
                p: 1
            }
        })

        _r.data.formData.forEach((song, index) => {
            dt.push({
                song,
                key: `${shortId.generate()}`
            })
        })

        dispatch({
            type: ON_FETCH_SONG_FROM_SERVER,
            songs: dt
        })
    }

    render() {
        return(
            <View style={styles.container} >
                <Icon name='ios-search' size={19} color="#8E8E93" />
                <TextInput 
                    placeholder='Search' 
                    placeholderTextColor='#8E8E93' 
                    underlineColorAndroid='transparent' 
                    keyboardType='default'
                    returnKeyType='done'
                    style={styles.textInput}
                    onChangeText={this._onChangeText}
                    onSubmitEditing={this._onSubmitEditing}
                />
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
        marginLeft: 8,
        paddingTop: 4,
        paddingBottom: 4
    }
})

export default connect(state => {
    return {
        songs: state.songs
    }
})(SearchField)