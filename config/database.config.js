const loglevel = process.env.loglevel || "trace"

module.exports = {
    dbconfig: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        database: process.env.DB_DATABASE || "2175412",
        password: process.env.DB_PASSWORD || "",
        connectionLimit: 10,
    },

    logger: require("tracer").console({
        format: ["{{timestamp}} [{{title}}] {{file}}:{{line}} : {{message}}"],
        preprocess: function (data) {
            data.title = data.title.toUpperCase()
        },
        dateformat: "isoUtcDateTime",
        level: loglevel,
    }),
}
