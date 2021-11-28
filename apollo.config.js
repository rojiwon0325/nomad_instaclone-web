module.exports = {
    client: {
        service: {
            includes: ["./src/**/*.{tsx,ts}"],
            tagName: "gql",
            name: "instaclone-backend",
            url: "http://localhost:4000/graphql",
        }
    },
};
