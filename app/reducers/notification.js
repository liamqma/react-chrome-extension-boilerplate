import _ from 'lodash';

const initialState = {
    9: false,
    10: false,
    11: false,
    12: true,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false
};

export default function notifications(state = initialState, action) {
    let clonedState = _.cloneDeep(state);
    switch (action.type) {
        case 'ADD':
            clonedState.push({moment: new Date().getTime(), completed: false});
            return clonedState;
        case 'COMPLETE':
            clonedState[action.index].completed = true;
            return clonedState;
        default:
            return state
    }
}