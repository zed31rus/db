import DB from "#core/repository/db/db.js";

export default class RepositoryContainer {
    constructor(
        readonly db: DB
    ){}
}