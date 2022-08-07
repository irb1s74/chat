import {Module} from '@nestjs/common';
import {DialogController} from './dialog.controller';
import {DialogService} from './dialog.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Dialog} from "./model/Dialog.model";
import {Message} from "./model/Message.model";
import {JwtModule} from "@nestjs/jwt";
import {UserHasDialog} from "../user/model/UserHasDialog.model";

@Module({
    controllers: [DialogController],
    providers: [DialogService],
    imports: [
        SequelizeModule.forFeature([Dialog, Message, UserHasDialog]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "SECRET_DEV",
            signOptions: {
                expiresIn: "12h"
            }
        })
    ],
    exports: [DialogService]
})
export class DialogModule {
}
