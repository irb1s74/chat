import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User} from "../../user/model/User.model";
import {Dialog} from "./Dialog.model";

interface MessageCreationAttrs {
    userId: number;
    dialogId: number;
    content: string;
}

@Table({tableName: 'message', updatedAt: true, createdAt: true})
export class Message extends Model<Message, MessageCreationAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Dialog)
    dialogId: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => User)
    userId: number;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @BelongsTo(() => Dialog)
    dialog: Dialog;

    @BelongsTo(() => User)
    user: User;
}