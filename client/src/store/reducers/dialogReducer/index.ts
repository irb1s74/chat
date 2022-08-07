import {DialogAction, DialogActionEnum, DialogState} from './types';

const initialState: DialogState = {
    dialogId: 0,
    foundUsers: [],
    dialogs: [],
    findIsLoading: false,
    showFoundUsers: false
};
export default function dialogReducer(
    state = initialState,
    action: DialogAction
): DialogState {
    switch (action.type) {
        case DialogActionEnum.SET_DIALOG:
            return {
                ...state,
                dialogId: action.dialogId,
            };
        case DialogActionEnum.SET_DIALOGS:
            return {
                ...state,
                dialogs: action.payload
            }
        case DialogActionEnum.SET_FOUND_USERS:
            return {
                ...state,
                foundUsers: action.users,
            };
        case DialogActionEnum.SET_FIND_LOADING:
            return {...state, findIsLoading: action.payload}
        case DialogActionEnum.SET_SHOW_FOUND_USERS:
            return {...state, showFoundUsers: action.payload}
        default:
            return state;
    }
}