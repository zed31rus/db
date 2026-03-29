import GetUser from "./classes/getUser";
import CreateUsers from "./classes/createUser";
import UpdateUsers from "./classes/updateUser";

export default class users {
    get = new GetUser();
    create = new CreateUsers();
    update = new UpdateUsers();
}
