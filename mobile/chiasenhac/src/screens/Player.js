import React, { Component } from 'react'
import { ScrollView, SafeAreaView, View, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'

class Player extends Component {
    static navigatorStyle = {
        largeTitle: false,
        navBarHidden: true
    }

    render() {
        return(
            //<ScrollView>
                <SafeAreaView style={{flex: 1, flexDirection: 'column'}} >
                    <View style={{backgroundColor: 'red', flex: 1}} >
                        <Text>COVER</Text>
                    </View>
                    <View style={{backgroundColor: 'blue', height: 100, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                        <View>
                            <Text>Seek bar</Text>
                        </View>
                        <View style={{flexDirection: 'row'}} >
                            <Text>Previous</Text>
                            <Text>Play/Pause</Text>
                            <Text>Next</Text>
                        </View>
                        <Text>BUTTON</Text>
                    </View>
                </SafeAreaView>
            //</ScrollView>
        )
    }
}

export default Player