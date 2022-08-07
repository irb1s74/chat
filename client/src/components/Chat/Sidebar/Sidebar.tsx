import React, {FC, memo} from 'react';
import Search from "./widget/Search/Search";
import Content from "./widget/Content/Content";
import {IUser} from "../../../models/IUser";
import {IDialog} from "../../../models/IDialog";

interface SidebarProps {
    user: IUser;
    dialogId: number
    foundUsers: IUser[]
    dialogs: IDialog[]
    showFoundUsers: boolean
    handleFindUser: (nickname: string) => void
    handleCreateDialog: (userId: number) => () => void
    handleSetDialog: (dialogId: number) => () => void;

}

const ChatSidebar: FC<SidebarProps> = ({
                                           handleFindUser,
                                           foundUsers,
                                           handleCreateDialog,
                                           dialogs,
                                           dialogId,
                                           user,
                                           handleSetDialog,
                                           showFoundUsers
                                       }) => {
    return (
        <div className="flex h-full flex-col space-y-2 w-full max-w-sm">
            <Search handleFindUser={handleFindUser}/>
            <Content
                dialogId={dialogId}
                handleSetDialog={handleSetDialog}
                user={user}
                dialogs={dialogs}
                handleCreateDialog={handleCreateDialog}
                foundUsers={foundUsers}
                showFoundUsers={showFoundUsers}
            />
        </div>
    );
};


export default memo(ChatSidebar);