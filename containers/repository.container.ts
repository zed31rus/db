import db from "#repo/db/db";

const RepositoryContainer = {
    db: new db()
}

export type RepositoryContainer = typeof RepositoryContainer;
export default RepositoryContainer;