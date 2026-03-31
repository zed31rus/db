import GetUser from "./classes/getUser.js";
import CreateUsers from "./classes/createUser.js";
import UpdateUsers from "./classes/updateUser.js";

export default class users {
    get = new GetUser();
    create = new CreateUsers();
    update = new UpdateUsers();
}
