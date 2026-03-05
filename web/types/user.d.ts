import { PublicUser } from "#lib/selector/user.selector";
import { FastifyRequest, RouteGenericInterface } from "fastify";

export interface AuthRequest<T extends RouteGenericInterface = RouteGenericInterface>
    extends FastifyRequest<T> {
        publicUser: PublicUser;
    }