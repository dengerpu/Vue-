const path = require('path')
module.exports = {
    mode: 'development',
    //入口
    entry:'./src/index.js',
    //打包到什么文件
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    //配置webpack-dev-server
    devServer:{
        //静态文件根目录
        static: {
          directory: path.resolve(__dirname, 'dist'),
        },
        //不压缩
        compress:false,
        //端口号
        port:8080
    }
}