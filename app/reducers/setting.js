export const DEFAULT_STATE = {
    from: 9,
    to: 17,
    every: 45
};

export default function setting(state = DEFAULT_STATE, action) {
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