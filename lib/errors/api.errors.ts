export default class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static Unauthorized(message = "Unauthorized") {
        return new ApiError(401, message)
    }

    static BadRequest(message: string) {
        return new ApiError(400, message)
    }
}