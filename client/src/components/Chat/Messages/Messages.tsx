import React, {ChangeEvent, createRef, FC, KeyboardEvent, memo, useEffect, useState} from 'react';
import {IUser} from "../../../models/IUser";
import {IMessage} from "../../../models/IMessage";
import {BiSend} from "react-icons/bi";
import {io} from "socket.io-client";

interface ChatMessagesProps {
    user: IUser
    dialogId: number
}

const ChatMessages: FC<ChatMessagesProps> = ({dialogId, user}) => {
    const socket = io(`http://chat.irb1s.ru:5000/chat`)
    let refContainer = createRef<HTMLDivElement>();
    const [messages, setMessages] = useState<IMessage[]>([])
    const [text, setText] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && text) {
            event.preventDefault();
            socket.emit("sendMessage", {dialogId, userId: user.id, content: text});
            setText("");
        }
    }

    const handleOnClick = () => {
        if (text) {
            socket.emit("sendMessage", {dialogId, userId: user.id, content: text});
            setText("");
        }
    }

    useEffect((): () => void => {
            if (dialogId) {
                socket.emit("joinRoom", {userId: user.id, dialogId});
            }
            socket.on('newMessages', (data: { messages: IMessage[] }) => {
                setMessages(data.messages)
            });
            return () => socket.emit('leaveRoom', dialogId);
        }, [dialogId]
    )

    return (
        <div
            className="relative h-full w-full rounded-md bg-slate-50 shadow ">
            <div className='flex flex-col-reverse h-[calc(100%_-_5rem)] overflow-y-auto p-5'>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={user.id === message.userId ? "w-fit mt-2 text-white text-right ml-auto text-base p-2 bg-indigo-300 rounded-br-md rounded-tl-md rounded-bl-md" : "w-fit mt-2 text-base p-2 rounded-br-md rounded-tr-md rounded-bl-md text-left mr-auto bg-slate-200"}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div ref={refContainer} className="max-w-[600px] w-full absolute  left-1/2 translate-x-[-50%] bottom-5">
                    <input
                        value={text}
                        className=" w-full bg-slate-200 px-3 py-4 rounded-md focus:ring ring-indigo-500 focus:outline-none transition ease-in-out shadow"
                        onChange={handleChange}
                        onKeyUp={handleKeyDown}
                        placeholder='Введите сообщение'
                    />
                    <button
                        onClick={handleOnClick}
                        className="absolute top-1/2 translate-y-[-50%] right-2 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500 hover:bg-indigo-600"
                        type='submit'>
                        <BiSend className="text-lg" color="FFF"/>
                    </button>
            </div>
        </div>
    );
};

export default memo(ChatMessages);