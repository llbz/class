module.exports= {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 136.6, //换算基数，
                        unitPrecision: 5, //允许REM单位增长到的十进制数字,小数点后保留的位数。
                        propList: ['*'],
                        exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        selectorBlackList: ['.van'], //要忽略并保留为px的选择器
                        mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 1 //设置要替换的最小像素值
                    })
                ]
            }
        }
    },
    publicPath: './',
}

