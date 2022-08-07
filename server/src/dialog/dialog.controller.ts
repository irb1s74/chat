import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {DialogService} from "./dialog.service";

@Controller('dialog')
export class DialogController {
    constructor(private dialogService: DialogService) {
    }

    @Post('/create')
    create(@Body() dto: { userId: number, secondId: number }) {
        return this.dialogService.create(dto.userId, dto.secondId);
    }

    @Get('/messages/:id')
    getMessages(@Param('id') dialogId) {
        return this.dialogService.getMessages(dialogId);
    }

    @Get('/:id')
    getDialogs(@Param('id') userId){
        return this.dialogService.getDialogs(userId);
    }

}
