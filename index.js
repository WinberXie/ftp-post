var findFile = require('./lib/findFile');
var sendFile = require('./lib/sendFile');
var path = require('path');

module.exports = function (options) {

    var _options = {
        sourth: '',
        config: {},
        divide: false,
        originPrefix: ''
    };

    for (var option in _options) {
        if(options.hasOwnProperty(option)) {
            _options[option] = options[option];
        }
    }

    var sourth = _options.sourth,
        config = _options.config,
        divide = _options.divide,
        originPrefix = _options.originPrefix,
        prefix = path.resolve(sourth), // 要上传文件相对于操作系统的绝对路径
        findConfig = {},
        result;


    for(var key in config) {
        if(!findConfig[key]) {
            findConfig[key] = config[key].suffix;
        }
    }

    result = findFile(sourth, divide, findConfig); //获取要上传的单文件的集合

    if(divide) {
        for (var item in config) {
            var files = result[item];
            if(files.length) {
                sendFile(files, config[item].ftpConfig, prefix, originPrefix);
            }
        }     
    } else {
        if(result.length) {
            sendFile(result, config, prefix, originPrefix);
        }
    }
};