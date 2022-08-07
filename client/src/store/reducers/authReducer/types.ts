import {IUser} from '../../../models/IUser';

export interface AuthState {
    user: IUser;
    isAuth: boolean;
    messageError: string;
}

export enum AuthActionEnum {
    SET_USER = 'SET_USER',
    SET_MESSAGE_ERROR = 'SET_MESSAGE_ERROR',
}

export interface IAuthSetUser {
    type: AuthActionEnum.SET_USER;
    payload: {
        user: IUser;
        isAuth: boolean;
    };
}

export interface IAuthSetMessageError {
    type: AuthActionEnum.SET_MESSAGE_ERROR;
    payload: string;
}

export type AuthAction = IAuthSetUser | IAuthSetMessageError;