import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import ElevatedView from 'react-native-elevated-view'
import { iOSUIKit, iOSColors } from 'react-native-typography'
import Icon from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'
import LinearGradient from 'react-native-linear-gradient'
import ActionSheet from '@yfuks/react-native-action-sheet'
import Share from 'react-native-share'
import axios from 'axios'

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
                return [iOSColors.yellow, iOSColors.orange]
            case '128kbps': case '360p':
                return [iOSColors.yellow, iOSColors.green]
            case '320kbps': case '480p':
                return [iOSColors.purple, iOSColors.tealBlue]
            case '500kbps': case 'hd 720p':
                return [iOSColors.red, iOSColors.yellow]
            case 'lossless': case 'hd 1080p':
                return [iOSColors.red, iOSColors.orange]
            default: return [iOSColors.tealBlue, iOSColors.blue]
        }
    }

    _onPressMenu = (link) => {
        ActionSheet.showActionSheetWithOptions({
            options: ['Download', 'Share', 'Cancel'],
            cancelButtonIndex: 2,
            tintColor: 'blue'
        }, async buttonIndex => {
            switch (buttonIndex) {
                case 0: {
                    let _r = await axios({
                        url: 'http://0.0.0.0:9000/download',
                        method: 'GET',
                        params: {
                            link
                        }
                    })

                    let options = []
                    await _r.data.forEach((item, i) => {
                        options.push(item.quality)
                        // options.unshift(item.quality)
                        // options.pop()
                    })
                    await options.sort((a, b) => {
                        let labelA = a.toLowerCase()
                        let labelb = b.toLowerCase()

                        if (labelA > labelb) return -1
    
                        if (labelA < labelb) return 1
    
                        return 0
                    })
                    await options.push('Cancel')

                    ActionSheet.showActionSheetWithOptions({
                        options,
                        cancelButtonIndex: options.length - 1,
                        tintColor: 'blue'
                    }, downloadIndex => {

                    })

                    break
                }
                case 1:
                    Share.open({
                        title: "React Native",
                        message: "Hola mundo",
                        url: "http://facebook.github.io/react-native/",
                        subject: "Share Link" //  for email
                    })
                    break;
                default:
                    break;
            }
        })
    }

    render() {
        return(
            <TouchableOpacity onPress={this._onPress.bind(this)} >
                <ElevatedView elevation={(Platform.OS === 'ios') ? 24 : 5} style={this.props.lastItem === false ? styles.container : [styles.container, {marginBottom: 56}]} >
                    <View style={styles.leftContainer} >
                        <Text style={styles.title} numberOfLines={1} >{this.props.title}</Text>
                        <Text style={styles.artist} >{this.props.artist}</Text>
                        <View style={styles.qualityContainer} >
                            {/* <View style={[this.getQuality(this.props.quality), styles.qualityTextContainer]} >
                                <Text style={styles.qualityText} >{this.props.quality}</Text>
                            </View> */}
                            <LinearGradient 
                                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} 
                                colors={this.getQuality(this.props.quality)}
                                style={styles.qualityTextContainer} >
                                <Text style={styles.qualityText} >{this.props.quality}</Text>
                            </LinearGradient>
                        </View>
                    </View>

                    <TouchableOpacity onPress={this._onPressMenu.bind(this, this.props.url)} >
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