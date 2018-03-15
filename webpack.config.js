module.exports = {
    entry:'./src/index.js',
    output:{
        path:__dirname+ "/dist",
        filename:"main.js"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:"babel-loader",
                query: {
                    presets: ['env'],
                    plugins: ['transform-vue-jsx']
                },
                exclude: /node_modules/,
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                query: {
                    presets: ['env'],
                    plugins: ['transform-vue-jsx']
                },
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
        ]
    }
}