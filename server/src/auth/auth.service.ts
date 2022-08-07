import {Injectable} from '@nestjs/common';
import {UserService} from 'src/user/user.service';
import {UserLoginDto} from 'src/user/dto/UserLogin.dto';
import {OAuth2Client} from "google-auth-library";

const clientId = process.env.GOOGLE_CLIENT_ID

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

    async login(userDto: UserLoginDto) {
        const {token} = userDto;
        const googleClient = new OAuth2Client(clientId);
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        let user = await this.userService.getUserByEmail(payload?.email);
        if (!user) {
            user = await this.userService.userCreate({
                email: payload?.email,
                avatar: payload?.picture,
                nickname: payload?.name,
            })
        }
        return user
    }
}
