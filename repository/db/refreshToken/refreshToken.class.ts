import DeleteRefreshToken from "./classes/deleteRefreshToken";
import CreateRefreshToken from "./classes/createRefreshToken";
import GetRefreshToken from "./classes/getRefreshToken";

export default class refreshToken {
    get = new GetRefreshToken();
    create = new CreateRefreshToken();
    delete = new DeleteRefreshToken();
}