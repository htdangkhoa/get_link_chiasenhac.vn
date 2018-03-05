import React, { Component } from 'react'
import { 
    SafeAreaView, 
    ScrollView, 
    View, 
    Text, 
    LayoutAnimation, 
    StyleSheet, 
    Platform,
    FlatList
} from 'react-native'
import axios from 'axios'
import { Player } from 'react-native-audio-toolkit'
import { UIActivityIndicator } from 'react-native-indicators'
import shortId from 'shortid'

import { connect } from 'react-redux'
import { ON_FETCH_SONG_FROM_SERVER } from '../redux/Action'

// My Component
import SearchField from '../components/SearchField'
import ListItem from '../components/ListItem'
import MiniPlayer from '../components/MiniPlayer'

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isTop: true,
            refreshing: false,
            page: 1
        }
    }

    async componentWillMount() {
        this.player = null

        this._reloadPlayer()
        
        // this._onRequestData('xin dung lang im', this.state.page)
    }

    _reloadPlayer = () => {
        if (this.player) {
            this.player.destroy();
        }
      
        //   this.player = new Player('http://data3.chiasenhac.com/downloads/1793/3/1792139-ba17664c/flac/1%202%203%204%20-%20Chi%20Dan[Lossless_FLAC].flac', {
        //     autoDestroy: false,
        //     continuesToPlayInBackground: true,
        //     wakeLock: true
        //   }).prepare((err) => {
        //     if (err) {
        //       console.log('error at _reloadPlayer():');
        //       console.log(err);
        //     } else {
        //       this.player.looping = false
        //     }
      
        //     // this._updateState();
        //   }).play()
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

    _onInfinityRefresh = async () => {
        if (this.props.songs.length > 0) {
            await this.setState({page: this.state.page + 1})

            this._onRequestData(this.props.query, this.state.page)
        }
    }

    _onRequestData = async (q, p) => {
        if (this.props.songs.length > 0) this.setState({refreshing: true})

        let dt = [...this.props.songs]

        let _r = await axios({
            url: 'http://0.0.0.0:9000/search',
            method: 'GET',
            params: {
                q,
                p
            }
        })

        _r.data.formData.forEach((song, index) => {
            dt.push({
                song,
                key: `${shortId.generate()}`
            })
        })

        let { dispatch } = this.props
        dispatch({
            type: ON_FETCH_SONG_FROM_SERVER,
            songs: dt
        })

        this.setState({refreshing: false})
    }

    _onRenderItem = ({item, index}) => {
        return <ListItem lastItem={index === this.props.songs.length - 1} title={item.song.title} artist={item.song.artist} quality={item.song.quality} url={item.song.url} />
    }

    render() {
        return(
                <SafeAreaView style={styles.container}>
                    <View style={(Platform.OS === 'ios') ? styles.scrollView : {}} >
                        <ScrollView 
                            ref='scrollView' 
                            scrollEnabled={false} >

                            <SearchField />
                        </ScrollView>
                    </View>

                    <FlatList 
                        style={styles.optimizedFlatList} 
                        onScroll={(Platform.OS === 'ios') ? this._onScroll : ''} 
                        onEndReachedThreshold={0} 
                        onEndReached={this._onInfinityRefresh.bind(this)}
                        data={this.props.songs} 
                        initialNumToRender={4}
                        renderItem={this._onRenderItem} />

                    {(this.state.refreshing) ? (
                        <View style={{height: 30, backgroundColor: '#F8F8F8'}} >
                            <UIActivityIndicator size={22} />
                        </View>
                    ) : null}

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
        flex: 1
    }
})

// export default Search
export default connect(state => {
    return {
        query: state.query,
        songs: state.songs
    }
})(Search)