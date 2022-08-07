import React, {FC, memo} from 'react';
import {IUser} from "../../../../../models/IUser";
import {IDialog} from "../../../../../models/IDialog";

interface SidebarContentProps {
    user: IUser
    foundUsers: IUser[]
    dialogs: IDialog[],
    dialogId: number
    showFoundUsers: boolean
    handleCreateDialog: (userId: number) => () => void
    handleSetDialog: (dialogId: number) => () => void;
}

const SidebarContent: FC<SidebarContentProps> = ({
                                                     user,
                                                     foundUsers,
                                                     handleCreateDialog,
                                                     dialogs,
                                                     dialogId,
                                                     handleSetDialog,
                                                     showFoundUsers
                                                 }) => {


    return (
        <div className="p-5 bg-slate-50 h-full rounded-md shadow">
            <ul role="list" className="p-4  divide-slate-200">
                {showFoundUsers ? (
                    <>
                        <div
                            className="text-center">{foundUsers.length > 1 ? `Найдено ${foundUsers.length} пользователей` : `Найден ${foundUsers.length} пользователь`} </div>
                        {foundUsers.map((foundUser, index) => (
                            <li onClick={handleCreateDialog(foundUser.id)} key={`${foundUser.id}_${index}`}
                                className="flex items-center p-3 my-4 rounded-md first:mt-0 last:mb-0 hover:hover:bg-indigo-200/50 transition ease-in-out cursor-pointer">
                                <img className="h-10 w-10 rounded-full border-0 bg-indigo-500"
                                     src={"avatar" in foundUser ? foundUser.avatar : undefined}
                                     alt={"nickname" in foundUser ? foundUser.nickname : ""}/>
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm  font-medium text-slate-900">{"nickname" in foundUser ? foundUser.nickname : ""}</p>
                                </div>
                            </li>
                        ))}
                    </>
                ) : (
                    dialogs.map((dialog, index) => (
                        <li onClick={handleSetDialog(dialog.dialogId)} key={`${dialog.id}_${index}`}
                            className={`flex items-center p-3 my-4 rounded-md first:mt-0 last:mb-0 ${dialog.dialogId === dialogId && "bg-indigo-200/50"} hover:hover:bg-indigo-200 transition ease-in-out cursor-pointer`}>
                            <img className="h-10 w-10 rounded-full border-0 bg-indigo-500"
                                 src={"avatar" in dialog.user ? dialog.user.avatar : undefined}
                                 alt={"nickname" in dialog.user ? dialog.user.nickname : ""}/>
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm  font-medium text-slate-900">{"nickname" in dialog.user ? dialog.user.nickname : ""}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default memo(SidebarContent);