import React, { Component } from 'react'
import { 
    SafeAreaView, 
    ScrollView, 
    View, 
    Text, 
    LayoutAnimation, 
    StyleSheet, 
    Platform
} from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import axios from 'axios'
import { Player } from 'react-native-audio-toolkit'

// My Component
import SearchField from '../components/SearchField'
import ListItem from '../components/ListItem'
import MiniPlayer from '../components/MiniPlayer'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isTop: true
        }
    }

    async componentWillMount() {
        this.player = null

        this._reloadPlayer()

        let dt = []

        let _r = await axios({
            url: 'https://chiasenhac-njoikkxzdm.now.sh/search',
            method: 'get',
            params: {
                q: 'xin dung lang im'
            }
        })

        _r.data.formData.forEach((song, index) => {
            dt.push({
                song,
                key: `${index}`
            })
        })

        this.setState({data: dt})
    }

    _reloadPlayer = () => {
        if (this.player) {
            this.player.destroy();
          }
      
          this.player = new Player('http://data3.chiasenhac.com/downloads/1793/1/1792139-ba17664c/flac/1%202%203%204%20-%20Chi%20Dan[Lossless_FLAC].flac', {
            autoDestroy: false,
            continuesToPlayInBackground: true,
            wakeLock: true
          }).prepare((err) => {
            if (err) {
              console.log('error at _reloadPlayer():');
              console.log(err);
            } else {
              this.player.looping = false
            }
      
            // this._updateState();
          }).play()
    }

    _listViewOffset = 0
    _onScroll = (event) => {
        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
          duration: 100,
          create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
          update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
          delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }

        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const limit = this._listViewContentHeight - this._listViewHeight
        const offset = event.nativeEvent.contentOffset.y
        const currentOffset = (offset > limit) ? limit : offset
        
        const direction = (currentOffset > 0 && currentOffset >= this._listViewOffset) ? 'down' : 'up'
           
        if (currentOffset > 0 && this.state.isTop && direction === 'down') {
            // this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
            this.refs.scrollView.scrollTo({x: 0, y: 70, animated: false})
            this.refs.scrollView.scrollToEnd({animated: false})
            this.setState({isTop: false})
        }

        if (currentOffset <= 0 && !this.state.isTop && direction === 'up') {
            this.refs.scrollView.scrollTo({x: 0, y: -70, animated: false})
            this.refs.scrollView.scrollTo({x: 0, y: 0, animated: false})

            setTimeout(() => {
                this.setState({isTop: true})
            }, 100)
        }

        // Update your scroll position
        this._listViewOffset = currentOffset
    }

    render() {
        return(
                <SafeAreaView style={styles.container}>
                    <View style={(Platform.OS === 'ios') ? styles.scrollView : {}} >
                        <ScrollView 
                            ref='scrollView' 
                            style={{}} 
                            scrollEnabled={false} >

                            <SearchField />
                        </ScrollView>
                    </View>

                    <OptimizedFlatList 
                        style={styles.optimizedFlatList} 
                        onScroll={(Platform.OS === 'ios') ? this._onScroll : ''} 
                        data={this.state.data} 
                        renderItem={({item}) => 
                            <ListItem title={item.song.title} artist={item.song.artist} quality={item.song.quality} />
                        } />

                    <MiniPlayer />
                </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: '#F8F8F8'
    },

    scrollView: {
        height: 70
    },

    optimizedFlatList: {
        flex: 1,
        paddingBottom: 16
    }
})

export default Search