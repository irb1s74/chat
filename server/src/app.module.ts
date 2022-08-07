import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule} from '@nestjs/config';
import {ServeStaticModule} from "@nestjs/serve-static";
import {UserModule} from "./user/user.module";
import {DialogModule} from './dialog/dialog.module';
import {User} from "./user/model/User.model";
import {Dialog} from "./dialog/model/Dialog.model";
import {Message} from "./dialog/model/Message.model";
import {ChatGateway} from './chat/chat.gateway';
import {AuthModule} from "./auth/auth.module";
import {UserHasDialog} from "./user/model/UserHasDialog.model";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [ChatGateway],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Dialog, Message, UserHasDialog],
            autoLoadModels: true
        }),
        AuthModule,
        UserModule,
        DialogModule,
    ]
})
export class AppModule {
}