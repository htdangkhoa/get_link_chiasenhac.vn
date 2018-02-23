import React, { Component } from 'react'
import { SafeAreaView, ScrollView, View, Text, FlatList, LayoutAnimation } from 'react-native'

import SearchField from '../components/SearchField'
import ListItem from '../components/ListItem'

class Search extends Component {
    constructor() {
        super()

        this.state = {
            data: [],
            isTop: true
        }
    }

    componentWillMount() {
        let dt = []
        for (let i = 0; i < 50; i++) {
            dt.push({
                title: i,
                key: `key${i}`
            })
        }

        this.setState({data: dt})
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
        
        const direction = (currentOffset > 0 && currentOffset >= this._listViewOffset)
          ? 'down'
          : 'up'

        // If the user is scrolling down (and the action-button is still visible) hide it
        // const isActionButtonVisible = direction === 'up'
        // // const isActionButtonVisible = direction === 'down'
        // if (isActionButtonVisible !== this.state.isActionButtonVisible) {
        //   LayoutAnimation.configureNext(CustomLayoutLinear)
        //   this.setState({ isActionButtonVisible })
        //     this.refs.scrollView.scrollToEnd()
        //     // this.refs.scrollView.scrollTo({x: 0, y: 0, animated: false})
        // } else {
        //     this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
        // }   
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
            //<ScrollView>
                <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
                    <ScrollView ref='scrollView' style={{height: 70}} scrollEnabled={false} >
                        <SearchField />
                    </ScrollView>
                    <FlatList style={{paddingBottom: 16}} onScroll={this._onScroll} data={this.state.data} renderItem={({item}) => <ListItem item={item.title} />} />
                </SafeAreaView>
            //</ScrollView>
        )
    }
}

export default Search