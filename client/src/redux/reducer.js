import { FETCH_SONG, FETCH_LINK } from './action'

const reducer = (state = { songs: [], links: [] }, action) => {
    switch (action.type) {
        case FETCH_SONG:
            return {
                songs: action.songs
            }
        case FETCH_LINK: 
            return {
                links: action.links.sort((a, b) => {
                    if (a.label < b.label) return -1

                    if (a.label > b.label) return 1

                    return 0
                })
            }
        default:
            return state
    }
}

export default reducer