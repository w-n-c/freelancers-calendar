module.exports = {
    apps: [
        {
            name: "freelancers calendar",
            script: "./index.js",
            watch: true,
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}
