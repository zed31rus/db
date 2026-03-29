import DB from "#repo/db/db";

export default class RepositoryContainer {
    constructor(
        readonly db: DB
    ){}
}