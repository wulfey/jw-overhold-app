
//state argument is not application state, it is the state for this reducer
export default function(state = null, action) {
    switch (action.type) {
        case 'BOOK_SELECTED':
            return action.payload
    default:
        return state;
    }
    
}

