import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import * as Screens from './screens'

const iconsMap = {}
let loadIcons = (icons) => {
    return new Promise((resolve, reject) => {
        // let { iconName, iconSize, iconColor, iconProvider } = icon
        // let Provider = iconProvider || Ionicons

        new Promise.all(
            Object.keys(icons).map(iconName => {
                let Provider = icons[iconName][2] || Ionicons

                return Provider.getImageSource(
                    iconName.replace(/--(active|big|small|very-big)/g, ''),
                    icons[iconName][0],
                    icons[iconName][1]
                )
            })
        ).then(sources => {
            Object.keys(icons).forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

            resolve(true);
        })
    })
}

export default registerApp = async (Store, Provider) => {
    Navigation.registerComponent('Screen.Search', () => Screens.Search, Store, Provider)
    Navigation.registerComponent('Screen.Download', () => Screens.Download)
    Navigation.registerComponent('Screen.Player', () => Screens.Player)

    loadIcons({
        'ios-search': [30, '#ddd'],
        'ios-cloud-download': [30, '#ddd']
    }).then(() => {
        Navigation.startTabBasedApp({
            tabs: [
                { label: 'Search', screen: 'Screen.Search', title: 'Search', icon: iconsMap['ios-search'] },
                { label: 'Download', screen: 'Screen.Download', title: 'Download', icon: iconsMap['ios-cloud-download'] }
            ],
            appStyle: {
                largeTitle: true,
                navBarNoBorder: true,
                screenBackgroundColor: '#FFFFFF',
                tabBarBackgroundColor: '#F8F8F8',
                navBarBackgroundColor: '#F8F8F8',
                navBarTitleTextCentered: Platform.OS === 'android'
            }
        })
    })
}