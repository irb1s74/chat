import {IUser} from "../../../models/IUser";
import {
    DialogActionEnum,
    IDialogSetDialog,
    IDialogSetDialogs,
    IDialogSetFoundUsers,
    IDialogSetLoading,
    IDialogSetShowFoundUsers
} from "./types";
import {AppDispatch} from "../../index";
import DialogService from "../../../api/DialogService";
import {IDialog} from "../../../models/IDialog";

export const SetDialog = (dialogId: number): IDialogSetDialog => ({
    type: DialogActionEnum.SET_DIALOG,
    dialogId,
});

export const SetUsers = (users: IUser[]): IDialogSetFoundUsers => ({
    type: DialogActionEnum.SET_FOUND_USERS,
    users
})

export const SetShowFoundUsers = (payload: boolean): IDialogSetShowFoundUsers => ({
    type: DialogActionEnum.SET_SHOW_FOUND_USERS,
    payload
})

export const SetDialogLoading = (payload: boolean): IDialogSetLoading => ({
    type: DialogActionEnum.SET_FIND_LOADING,
    payload
})

export const SetDialogs = (payload: IDialog[]): IDialogSetDialogs => ({
    type: DialogActionEnum.SET_DIALOGS,
    payload
})

export const findUsers = (nickname: string, userId: number) => async (dispatch: AppDispatch) => {
    try {
        if (nickname) {
            dispatch(SetDialogLoading(true))
            const response = await DialogService.FindUser(nickname, userId);
            dispatch(SetUsers(response.data))
            dispatch(SetShowFoundUsers(true))
            dispatch(SetDialogLoading(false))
        } else {
            dispatch(SetUsers([]))
            dispatch(SetShowFoundUsers(false))
        }
    } catch (e) {
        console.log(e)
    }
}

export const getDialogs = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await DialogService.GetDialogs(userId);
        dispatch(SetDialogs(response.data))
    } catch (e) {
        console.log(e)
    }
}

export const createDialog = (userId: number, secondId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(SetDialogLoading(true))
        const response = await DialogService.CreateDialog(userId, secondId);
        dispatch(SetShowFoundUsers(false))
        if (response.data) {
            dispatch(SetDialogs(response.data))
        }
        dispatch(SetDialogLoading(false))
    } catch (e) {
        console.log(e)
    }
}