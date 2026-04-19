import CorsWrapper from "#web/wrappers/cors.wrapper.js";
import RateLimiterWrapper from "#web/wrappers/rateLimiter.wrapper.js";
import ValidatorWrapper from "#web/wrappers/validator.wrapper.js";

export default class WrapperContainer {
    constructor(
        readonly validator: ValidatorWrapper,
        readonly rateLimiter: RateLimiterWrapper,
        readonly cors: CorsWrapper
    ) {}
}