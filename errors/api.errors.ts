export default class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public errors: any[] = []
    ) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static Unauthorized(message = "not Authorized") {
        return new ApiError(401, message);
    }

    static Forbidden(message = "Access denied") {
        return new ApiError(403, message);
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors);
    }

    static Internal(message = "Internal error") {
        return new ApiError(500, message);
    }

    static NotFound(message = "Not found") {
        return new ApiError(404, message)
    }
}