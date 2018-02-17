import { FETCH_SONG } from './action'

const reducer = (state = { songs: [] }, action) => {
    switch (action.type) {
        case FETCH_SONG:
            return {
                songs: action.songs
            }
        default:
            return state
    }
}

export default reducer