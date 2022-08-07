import React, {FC, memo} from "react";
import {GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin} from "react-google-login";
import {googleSetting} from "../../../helpers/googleSetting";

interface LoginProps {
    handleAuth: (token: string) => void;
}

const Login: FC<LoginProps> = ({handleAuth}) => {

    const onSuccess = (res: (GoogleLoginResponse | GoogleLoginResponseOffline)) => {
        if ("tokenId" in res) {
            handleAuth(res.tokenId)
        }
    }
    const onFailure = (res: (GoogleLoginResponse | GoogleLoginResponseOffline)) => {
        console.log("Error:", res)
    }
    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: googleSetting.clientId,
        isSignedIn: true,
        cookiePolicy: "single_host_origin"
    });


    return (
        <button onClick={signIn} className='w-full text-white text-lg rounded-md bg-indigo-500 p-3'>
            Войти
        </button>
    );
};

export default memo(Login);