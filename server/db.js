import knex from "knex";

export default knex({
    client: 'postgres',
    connection: {
        host: "db",
        user: "username",
        password: "password",
        database: "username",
    },
});