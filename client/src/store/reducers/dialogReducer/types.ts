import {IUser} from "../../../models/IUser";
import {IDialog} from "../../../models/IDialog";

export interface DialogState {
    dialogId: number;
    foundUsers: IUser[];
    dialogs: IDialog[];
    findIsLoading: boolean;
    showFoundUsers: boolean
}

export enum DialogActionEnum {
    SET_DIALOG = "SET_DIALOG",
    SET_FOUND_USERS = "SET_FOUND_USERS",
    SET_DIALOGS = "SET_DIALOGS",
    SET_FIND_LOADING = "SET_FIND_LOADING",
    SET_SHOW_FOUND_USERS = "SET_SHOW_FOUND_USERS"
}

export interface IDialogSetDialog {
    type: DialogActionEnum.SET_DIALOG;
    dialogId: number;
}

export interface IDialogSetFoundUsers {
    type: DialogActionEnum.SET_FOUND_USERS;
    users: IUser[];
}

export interface IDialogSetShowFoundUsers {
    type: DialogActionEnum.SET_SHOW_FOUND_USERS;
    payload: boolean;
}

export interface IDialogSetDialogs {
    type: DialogActionEnum.SET_DIALOGS;
    payload: IDialog[];
}

export interface IDialogSetLoading {
    type: DialogActionEnum.SET_FIND_LOADING;
    payload: boolean
}


export type DialogAction = IDialogSetDialog | IDialogSetFoundUsers | IDialogSetLoading | IDialogSetDialogs | IDialogSetShowFoundUsers;