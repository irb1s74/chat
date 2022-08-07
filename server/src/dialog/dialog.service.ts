import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Dialog} from "./model/Dialog.model";
import {Message} from "./model/Message.model";
import {UserHasDialog} from "../user/model/UserHasDialog.model";
import {User} from "../user/model/User.model";


@Injectable()
export class DialogService {
    constructor(@InjectModel(Dialog) private dialogRepository: typeof Dialog, @InjectModel(Message) private messageRepository: typeof Message, @InjectModel(UserHasDialog) private userDialogRepository: typeof UserHasDialog) {
    }

    async create(secondId, userId) {
        try {
            const dialog = await this.dialogRepository.create()
            await this.userDialogRepository.create({dialogId: dialog.id, userId})
            await this.userDialogRepository.create({dialogId: dialog.id, userId: secondId})
            return this.getDialogs(userId)
        } catch (e) {
            throw new HttpException({"Error": e}, HttpStatus.BAD_REQUEST)
        }
    }

    async sendMessage(dialogId, userId, content) {
        return await this.messageRepository.create({
            userId, dialogId, content
        })
    }

    async getDialogs(userId) {
        const dialogs = await this.userDialogRepository.findAll({
            include: [
                {model: User}
            ]
        })
        const dialogsId = dialogs.filter(dialog => dialog.userId == userId).map((dialog) => dialog.dialogId)
        return dialogs.filter((dialog) => dialogsId.includes(dialog.dialogId) && dialog.userId != userId)
    }

    async getMessages(dialogId) {
        return await this.dialogRepository.findByPk(dialogId, {
            order: [[{model: Message, as: "messages"}, "createdAt", "DESC"]],
            include: [
                {
                    model: Message,
                }
            ],
        })
    }

}
