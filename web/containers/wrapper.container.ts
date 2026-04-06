import ValidatorWrapper from "#web/wrappers/validator.wrapper";

export default class WrapperContainer {
    constructor(
        readonly validator: ValidatorWrapper
    ) {}
}