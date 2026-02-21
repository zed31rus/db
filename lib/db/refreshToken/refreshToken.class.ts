import DeleteRefreshToken from "./classes/deleteRefreshToken";
import CreateRefreshToken from "./classes/createRefreshToken";
import GetRefreshToken from "./classes/getRefreshToken";

const refreshToken = {
    get: GetRefreshToken,
    create: CreateRefreshToken,
    delete: DeleteRefreshToken,
}

export default refreshToken