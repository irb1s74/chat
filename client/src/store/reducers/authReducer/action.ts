import {AuthActionEnum, IAuthSetUser} from "./types";
import {IUser} from "../../../models/IUser";
import AuthService from "../../../api/AuthService";
import {AppDispatch} from "../../index";

export const SetUser = (user: IUser, isAuth: boolean): IAuthSetUser => ({
    type: AuthActionEnum.SET_USER,
    payload: {
        user,
        isAuth,
    },
});

export const AuthLogin = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await AuthService.Login(token)
        dispatch(SetUser(res.data, true))
    } catch (e) {
        console.log(e)
    }
}