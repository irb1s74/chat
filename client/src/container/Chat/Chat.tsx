import React, {FC, useCallback, useLayoutEffect} from 'react';
import Sidebar from "../../components/Chat/Sidebar/Sidebar";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IUser} from "../../models/IUser";
import {createDialog, findUsers, getDialogs, SetDialog} from "../../store/reducers/dialogReducer/action";
import {useDispatch} from "react-redux";
import Logout from "../../components/UI/GoogleButton/Logout";
import Messages from "../../components/Chat/Messages/Messages";
import {SetUser} from "../../store/reducers/authReducer/action";
import {IDialog} from "../../models/IDialog";

interface ChatProps {
    user: IUser,
    dialogId: number
    foundUsers: IUser[]
    dialogs: IDialog[]
    showFoundUsers: boolean
    handleFindUser: (nickname: string) => void
    handleCreateDialog: (userId: number) => () => void
    handleGetDialogs: () => void
    handleSetDialog: (dialogId: number) => () => void;
    handleLogout: () => void
}

const Chat: FC<ChatProps> = ({
                                 user,
                                 dialogId,
                                 handleFindUser,
                                 handleLogout,
                                 foundUsers,
                                 showFoundUsers,
                                 handleCreateDialog,
                                 handleGetDialogs,
                                 handleSetDialog,
                                 dialogs
                             }) => {

    useLayoutEffect(() => {
        handleGetDialogs()
    }, [])

    return (
        <div className="bg-slate-200 flex flex-row space-x-5 h-screen w-screen p-10">
            <Sidebar
                user={user}
                dialogs={dialogs}
                showFoundUsers={showFoundUsers}
                handleCreateDialog={handleCreateDialog}
                handleFindUser={handleFindUser}
                handleSetDialog={handleSetDialog}
                dialogId={dialogId}
                foundUsers={foundUsers}
            />
            {dialogId ? (
                <Messages dialogId={dialogId} user={user}/>
            ) : (
                <div className='flex justify-center items-center h-full w-full rounded-md p-5 bg-slate-50'>
                    <div className='text-4xl'>
                        Выберите, кому хотели бы написать
                    </div>
                </div>
            )}
            <Logout handleLogout={handleLogout}/>
        </div>
    );
};

const ContainerChat = () => {
    const dispatch = useDispatch();
    const user = useTypedSelector((state) => state.auth.user)
    const dialogs = useTypedSelector((state) => state.dialog.dialogs)
    const dialogId = useTypedSelector((state) => state.dialog.dialogId)
    const foundUsers = useTypedSelector((state) => state.dialog.foundUsers)
    const showFoundUsers = useTypedSelector((state) => state.dialog.showFoundUsers)

    const handleSetDialog = useCallback((dialogId: number) => () => dispatch(SetDialog(dialogId)), [])
    const handleFindUser = useCallback((nickname: string) => dispatch(findUsers(nickname, user.id)), [])
    const handleLogout = useCallback(() => dispatch(SetUser({} as IUser, false)), [])
    const handleCreateDialog = useCallback((userId: number) => () => dispatch(createDialog(user.id, userId)), [])
    const handleGetDialogs = useCallback(() => dispatch(getDialogs(user.id)), [])
    return (
        <Chat
            user={user}
            dialogId={dialogId}
            dialogs={dialogs}
            handleFindUser={handleFindUser}
            handleLogout={handleLogout}
            foundUsers={foundUsers}
            showFoundUsers={showFoundUsers}
            handleSetDialog={handleSetDialog}
            handleGetDialogs={handleGetDialogs}
            handleCreateDialog={handleCreateDialog}
        />
    )
}

export default ContainerChat;