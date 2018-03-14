module.exports = {
    entry:'./src/index.js',
    output:{
        path:__dirname+ "/dist",
        filename:"main.js"
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
        ]
    }
}