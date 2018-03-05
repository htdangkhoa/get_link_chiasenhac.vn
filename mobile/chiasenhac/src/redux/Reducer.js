import { 
    ON_FETCH_SONG_FROM_SERVER, 
    ON_RE_FETCH_DATA, 
    ON_SAVE_QUERY 
} from './Action'

const defaultState = {
    query: '',
    songs: [],
    links: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ON_FETCH_SONG_FROM_SERVER:
            return Object.assign({}, state, {
                songs: [...action.songs]
            })
        case ON_RE_FETCH_DATA: 
            return Object.assign({}, state, {
                songs: []
            })
        case ON_SAVE_QUERY:
            return Object.assign({}, state, {
                query: action.query
            })
        default:
            return state
    }
}

export default reducer