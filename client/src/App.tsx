import React, {FC, useEffect, useLayoutEffect} from "react";
import Router from "./router/Router";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Socket} from "socket.io-client";
import {IMessage} from "./models/IMessage";

interface AppProps {
    isAuth: boolean
}

const App: FC<AppProps> = ({isAuth}) => {
    return (
        <Router  isAuth={isAuth}/>
    );
};
const ContainerApp = () => {

    const isAuth = useTypedSelector((store) => store.auth.isAuth)
    return (
        <App  isAuth={isAuth}/>
    )
}

export default ContainerApp;