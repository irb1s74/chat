import React, {FC, useCallback, useEffect} from 'react';
import Login from "../../components/UI/GoogleButton/Login";
import {useDispatch} from "react-redux";
import {AuthLogin, SetAuthLoading} from "../../store/reducers/authReducer/action";
import {gapi} from "gapi-script";
import {googleSetting} from "../../helpers/googleSetting";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface AuthProps {
    isLoading: boolean
    handleAuth: (token: string) => void,
    handleSetAuthLoading: (payload: boolean) => void
}


const Auth: FC<AuthProps> = ({handleAuth, isLoading, handleSetAuthLoading}) => {
    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                client_id: googleSetting.clientId,
                scope: "email"
            })
        })
    }, [])

    return (
        <>
            {isLoading && (
                <div className="fixed z-40 bg-slate-200 w-screen h-screen flex justify-center items-center">
                    <svg className="animate-spin  h-10 w-10 text-indigo-500 " xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
            <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
                <form className="bg-white w-full max-w-md shadow rounded-md px-8 pt-6 pb-8">
                    <div className="text-2xl mb-8">Вход в аккаунт</div>
                    <Login handleSetAuthLoading={handleSetAuthLoading} handleAuth={handleAuth}/>
                </form>
            </div>
        </>
    );
};

const ContainerAuth = () => {
    const dispatch = useDispatch()
    const isLoading = useTypedSelector((state) => state.auth.isAuthLoading)
    const handleAuth = useCallback((token: string) => dispatch(AuthLogin(token)), [])
    const handleSetAuthLoading = useCallback((payload: boolean) => dispatch(SetAuthLoading(payload)), [])
    return (
        <Auth isLoading={isLoading} handleSetAuthLoading={handleSetAuthLoading} handleAuth={handleAuth}/>
    )
}

export default ContainerAuth;
