const webpack = require("webpack");

module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "static",
    pwa: {
        iconPaths: {
            favicon32: "favicon.ico",
            favicon16: "favicon.ico",
            appleTouchIcon: "favicon.ico",
            maskIcon: "favicon.ico",
            msTileImage: "favicon.ico"
        }
    },
    devServer: {
        // host: "localhost", //设置本地服务器   选填
        // port: 8080, //设置本地默认端口  选填
        proxy: {
            //设置代理，必须填
            "/v1": {
                //上线环境
                target: "http://data.ivalor.com/api", //代理的目标地址，这是豆瓣接口地址网址
                //开发环境
                //target: "http://localhost:26481/api",
                changeOrigin: true, //是否设置同源，输入是的
                pathRewrite: {
                    //路径重写
                    // "/v1": "/v1" //选择忽略拦截器里面的单词
                }
            }
        }
    },
    chainWebpack: config => {
        config.plugin("provide").use(webpack.ProvidePlugin, [
            {
                $: "jquery",
                jquery: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }
        ]);
    }
};
