import {AuthActionEnum, IAuthSetLoading, IAuthSetUser} from "./types";
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

export const SetAuthLoading = (payload: boolean): IAuthSetLoading => ({
    type: AuthActionEnum.SET_AUTH_LOADING,
    payload
})

export const AuthLogin = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(SetAuthLoading(true))
        const res = await AuthService.Login(token)
        if (res.data) {
            dispatch(SetUser(res.data, true))
        }
        dispatch(SetAuthLoading(false))
    } catch (e) {
        console.log(e)
    }
}
