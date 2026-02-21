import GetUser from "./classes/getUser";
import CreateUsers from "./classes/createUser";
import UpdateUsers from "./classes/updateUser";

const users = {
    get: GetUser,
    create: CreateUsers,
    update: UpdateUsers,
}

export default users