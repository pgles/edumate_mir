import * as ActionTypes from '../ActionTypes';

export const User = (
    state = {
        email : '',
        password: ''
    },
    action: any
) => {
    switch(action.type) {
        case ActionTypes.EXAMPLE_ACTION:
            return {...state};
        default:
            return state;
    }
}