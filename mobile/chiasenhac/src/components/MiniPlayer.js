import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { iOSUIKit, iOSColors } from 'react-native-typography'
import Slider from 'react-native-slider'

class MiniPlayer extends Component {
    render() {
        return(
            <View style={styles.container} >
                <View style={styles.infoContainer} >
                    <Image 
                        style={styles.cover} 
                        source={{uri: 'https://colorcodedlyrics.com/wp-content/uploads/2013/03/GD-EXPECT.jpg'}} 
                        resizeMode='stretch' />

                    <View style={styles.textContainer} >
                        <Text 
                            style={styles.title}
                            numberOfLines={1} >
                            Xin đừng lặng im
                        </Text>
                        <Text 
                            style={styles.artist} 
                            numberOfLines={1} >
                            Soobin Hoàng Sơn
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Icon 
                            name='ios-play' 
                            size={30} 
                            color={iOSColors.black} />
                    </TouchableOpacity>
                </View>
                <Slider 
                    style={styles.slider}
                    minimumTrackTintColor={iOSColors.red} 
                    trackStyle={styles.track} 
                    thumbTouchSize={{width: 0, height: 0}} 
                    thumbStyle={styles.thumb} 
                    maximumValue={100} 
                    value={30} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(248, 248, 248, .82)', 
        justifyContent: 'center', 
        borderTopWidth: .5, 
        borderTopColor: iOSColors.midGray
    },

    infoContainer: {
        flexDirection: 'row', 
        paddingLeft: 16, 
        paddingRight: 16, 
        paddingTop: 8, 
        paddingBottom: 8, 
        alignItems: 'center'
    },

    cover: {
        height: 60, 
        width: 60
    },

    textContainer: {
        flex: 1, 
        flexDirection: 'column', 
        marginLeft: 8, 
        marginRight: 8
    },

    title: {
        ...iOSUIKit.subheadEmphasizedObject, 
        marginBottom: 4
    },

    artist: {
        ...iOSUIKit.caption2Object
    },

    slider: {
        height: 2
    },

    track: {
        height: 3, 
        backgroundColor: iOSColors.lightGray
    },

    thumb: {
        width: 0, 
        height: 0
    }
})

export default MiniPlayer