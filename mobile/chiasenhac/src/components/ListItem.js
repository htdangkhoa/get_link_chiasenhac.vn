import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import ElevatedView from 'react-native-elevated-view'
import { iOSUIKit, iOSColors } from 'react-native-typography'
import Icon from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'

class ListItem extends Component {
    constructor(props) {
        super(props)
    }

    _onPress = () => {
        // Navigation.showModal({
        //     screen: 'Screen.Player',
        // })
    }

    getQuality = (quality) => {
        switch (quality.toLowerCase()) {
            case '32kbps': case '180p':
                return { backgroundColor: iOSColors.tealBlue }
            case '128kbps': case '360p':
                return { backgroundColor: iOSColors.green }
            case '320kbps': case '480p':
                return { backgroundColor: iOSColors.blue }
            case '500kbps': case 'HD 720p':
                return { backgroundColor: iOSColors.orange }
            case 'lossless': case 'HD 1080p':
                return { backgroundColor: iOSColors.pink }
            default: return { backgroundColor: iOSColors.tealBlue }
        }
    }

    render() {
        return(
            <TouchableOpacity onPress={this._onPress.bind(this)} >
                <ElevatedView elevation={(Platform.OS === 'ios') ? 24 : 5} style={styles.container} >
                    <View style={styles.leftContainer} >
                        <Text style={styles.title} numberOfLines={1} >{this.props.title}</Text>
                        <Text style={styles.artist} >{this.props.artist}</Text>
                        <View style={styles.qualityContainer} >
                            <View style={[this.getQuality(this.props.quality), styles.qualityTextContainer]} >
                                <Text style={styles.qualityText} >{this.props.quality}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity>
                        <Icon 
                            name='ios-more' 
                            size={22} 
                            color="black" 
                            style={styles.rightIcon} />
                    </TouchableOpacity>
                </ElevatedView>
            </TouchableOpacity>
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