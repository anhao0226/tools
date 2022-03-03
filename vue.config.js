
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    pages: {
        popup: {
            entry: "src/popup/main.ts",
            template: "src/popup/index.html",
            filename: "popup.html"
        }
    },

    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "src/content/main.js",
                        to: "js/content.js",
                    },
                    {
                        from: "src/plugins/*.js",
                        to: "js/[name].js"
                    },
                    {
                        from: "src/styles/*.css",
                        to: "css/[name].css",
                    }
                ]
            })
        ],
    },
}