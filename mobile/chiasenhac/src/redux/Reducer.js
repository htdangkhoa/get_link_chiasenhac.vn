import { ON_SEARCH_FIELD_LAYOUT } from './Action'

const defaultState = {
    search_field_height: 0,
    songs: [],
    links: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ON_SEARCH_FIELD_LAYOUT:
            return {
                search_field_height: action.search_field_height
            }
        default:
            return state
    }
}

export default reducer