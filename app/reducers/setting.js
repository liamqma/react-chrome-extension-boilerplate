const initialState = {
    from: 9,
    to: 17,
    every: 45
};

export default function setting(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                [action.key]: action.value
            };
        default:
            return state
    }
}