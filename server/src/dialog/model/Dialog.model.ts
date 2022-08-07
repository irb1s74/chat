import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Message} from "./Message.model";
import {UserHasDialog} from "../../user/model/UserHasDialog.model";


@Table({tableName: 'dialog', updatedAt: true, createdAt: true})
export class Dialog extends Model<Dialog, {}> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @HasMany(() => Message)
    messages: Message[];

    @HasMany(() => UserHasDialog)
    user: UserHasDialog[];
}