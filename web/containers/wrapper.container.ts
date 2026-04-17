import CorsWrapper from "#web/wrappers/cors.wrapper";
import RateLimiterWrapper from "#web/wrappers/rateLimiter.wrapper";
import ValidatorWrapper from "#web/wrappers/validator.wrapper";

export default class WrapperContainer {
    constructor(
        readonly validator: ValidatorWrapper,
        readonly rateLimiter: RateLimiterWrapper,
        readonly cors: CorsWrapper
    ) {}
}