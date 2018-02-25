import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { iOSUIKit, iOSColors } from 'react-native-typography'

class MiniPlayer extends Component {
    render() {
        return(
            <View style={{backgroundColor: 'rgba(248, 248, 248, .82)', justifyContent: 'center', borderTopWidth: .5, borderTopColor: 'rgba(0, 0, 0, .3)'}} >
                <View style={{flexDirection: 'row', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, alignItems: 'center'}} >
                    <Image source={{uri: 'https://colorcodedlyrics.com/wp-content/uploads/2013/03/GD-EXPECT.jpg'}} resizeMode='stretch' style={{height: 60, width: 60}} />
                    <View style={{flex: 1, flexDirection: 'column', marginLeft: 8, marginRight: 8}} >
                        <Text numberOfLines={1} style={{...iOSUIKit.subheadEmphasizedObject, marginBottom: 4}} >Xin đừng lặng im</Text>
                        <Text numberOfLines={1} style={iOSUIKit.caption2} >Soobin Hoàng Sơn</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon name='ios-play' size={30} color={iOSColors.black} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default MiniPlayer