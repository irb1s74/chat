import {ROOT_URL} from "../helpers/ROOT_URL";
import axios, {AxiosResponse} from "axios";

export default class AuthService {
    static async Login(token: string): Promise<AxiosResponse> {
        return axios
            .post(
                '/auth/login',
                {
                    token
                },
                {
                    withCredentials: false,
                    baseURL: ROOT_URL,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            .then((res) => {
                return res;
            })
            .catch((e) => {
                return e.response;
            });
    }
}