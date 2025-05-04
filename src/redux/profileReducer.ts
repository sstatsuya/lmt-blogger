import { ILoginResponse } from '../services';
import * as actions from './actions';

export interface IProfileState extends ILoginResponse { }
export const initProfile: IProfileState = {
    id: '',
    role: 'member',
    avatar: '',
    fullname: '',
    token: '',
    address: '',
    email: '',
    phoneNumber: '',
    uploadKey: ''
};
export const profileReducer = (
    state: IProfileState = initProfile,
    action: any,
): IProfileState => {
    switch (action.type) {
        case actions.GET_USER_INFO:
            return {
                ...state,
                ...action.payload,
            };
        case actions.LOGOUT: {
            return { ...initProfile };
        }
        default:
            return state;
    }
};
