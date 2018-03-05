import { ON_FETCH_SONG_FROM_SERVER, ON_RE_FETCH_DATA } from './Action'

const defaultState = {
    songs: [],
    links: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ON_FETCH_SONG_FROM_SERVER:
            return {
                songs: [...action.songs]
            }
        case ON_RE_FETCH_DATA: 
            return {
                songs: [],
                links: []
            }
        default:
            return state
    }
}

export default reducer