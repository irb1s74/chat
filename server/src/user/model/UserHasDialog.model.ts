import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Dialog} from "../../dialog/model/Dialog.model";
import {User} from "./User.model";

interface UsersHasDialogCreationAttrs {
    userId: number;
    dialogId: number;
}

@Table({tableName: 'user_has_dialog', updatedAt: false})
export class UserHasDialog extends Model<UserHasDialog, UsersHasDialogCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    userId: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Dialog)
    dialogId: number;

    @BelongsTo(() => User)
    user: User[];

    @BelongsTo(() => Dialog)
    dialog: Dialog;
}