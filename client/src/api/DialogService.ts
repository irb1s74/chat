import {ROOT_URL} from "../helpers/ROOT_URL";
import axios, {AxiosResponse} from "axios";

export default class DialogService {

    static async FindUser(nickname: string, userId: number): Promise<AxiosResponse> {
        return axios
            .post(
                '/user/find',
                {
                    nickname,
                    userId
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

    static async CreateDialog(userId: number, secondUserId: number): Promise<AxiosResponse> {
        return axios
            .post(
                '/dialog/create',
                {
                    userId,
                    secondId: secondUserId
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

    static async GetDialogs(userId: number): Promise<AxiosResponse> {
        return axios
            .get(
                `/dialog/${userId}`,
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