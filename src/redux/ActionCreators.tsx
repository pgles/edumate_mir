import * as ActionTypes from './ActionTypes';

export const fetchUser = () => (dispatch: any) => {
	dispatch(exampleAction());
}

export const exampleAction = () => ({
	type: ActionTypes.EXAMPLE_ACTION,
	payload: {
		email: 'example@xyz.com',
		password: 'password'
	}
});

export const requestLogin = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}
  
export const receiveLogin = (user:any) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        user
    }
}
  
export const loginError = (message:any) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

