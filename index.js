var findFile = require('./lib/findFile');
var sendFile = require('./lib/sendFile');
var path = require('path');

module.exports = function (sourth, config, divide) {
    var result = findFile(sourth, divide); //获取要上传的单文件的集合
    var prefix = path.resolve(sourth, '../'); // 要上传文件相对于操作系统的绝对路径

    // 为 divide 设置默认值 
    if(typeof divide != 'boolean') {
        divide = false
    }  

    if(divide) {
        var mergeConfig = {
            js: {
               files: result.jsFile,
               config: config.jsConfig
            },
            css: {
                files: result.cssFile,
                config: config.cssConfig
            },
            img: {
                files: result.imgFile,
                config: config.imgConfig
            }
        };

        for (var item in mergeConfig) {
            sendFile(mergeConfig[item].files, mergeConfig[item].config, prefix);
        }     
    } else {
        sendFile(result, config, prefix);
    }
};