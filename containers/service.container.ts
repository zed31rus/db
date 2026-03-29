import AccountService from "#services/account";
import AuthService from "#services/auth";
import MeService from "#services/me";
import UsersService from "#services/users";
import LibContainer from "./lib.container";
import ManagerContainer from "./manager.container";
import RepositoryContainer from "./repository.container";

const ServiceContainer = {
    account: new AccountService(LibContainer, ManagerContainer, RepositoryContainer),
    auth: new AuthService(LibContainer, ManagerContainer, RepositoryContainer),
    me: new MeService(LibContainer, ManagerContainer, RepositoryContainer),
    users: new UsersService(LibContainer, ManagerContainer, RepositoryContainer)
}

export type ServiceContainer = typeof ServiceContainer;
export default ServiceContainer;