import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {DialogService} from "../dialog/dialog.service";
import {Server, Socket} from "socket.io";

@WebSocketGateway({namespace: 'chat', cors: true})
export class ChatGateway {
    constructor(private dialogService: DialogService) {
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage('joinRoom')
    async handleRoomJoin(client: Socket, payload: { userId: number, dialogId: number }) {
        client.join(`${payload.dialogId}`)
        const res = await this.dialogService.getMessages(payload.dialogId)
        client.emit('newMessages', res)
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, message: { dialogId: number, userId: number, content: string }) {
        await this.dialogService.sendMessage(message.dialogId, message.userId, message.content)
        const res = await this.dialogService.getMessages(message.dialogId)
        this.server.to(`${message.dialogId}`).emit('newMessages', res)
    }

    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, dialogId: number) {
        client.leave(`${dialogId}`);
        client.emit('leftRoom', `${dialogId}`);
    }
}
