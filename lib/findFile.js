var fs = require('fs');
var path = require('path');

module.exports = function (sourth, divide, config) {
    // 静态资源存储在同一台 cdn 服务器
    var result = [],
        resultMap = {},
        propsArray = Object.keys(config),       
        propsLength = propsArray.length;

    for(var key in config) {
        if(!resultMap[key]) {
            resultMap[key] = [];
        }
    }

    var fileClass = function(file, currentPath) {
        var flag = false;
        for(var j = 0; j < propsLength; j++) {
            if(flag) break;
            var item = propsArray[j],
                suffixArray = config[item].split('|'),
                length = suffixArray.length;

            for(var i = 0; i < length; i++) {
                if(file.indexOf(suffixArray[i]) > -1) {
                    resultMap[item].push(currentPath);
                    falg = true;
                    break;
                }
            }
        }
    };

    // 递归遍历文件并将文件进行分类
    var makeResult = function (sourth) {
        var files = fs.readdirSync(sourth)
        files.forEach(function(file){
            var currentPath = path.join(sourth, file),
                states = fs.statSync(currentPath);

            if (states.isDirectory()) {
                // 如果为目录则递归遍历
                makeResult(currentPath);
            } else if(divide){
                // 按照文件类型将文件进行归类
                fileClass(file, currentPath);
            } else {
                var fileSuffixArray = ['.js','.css','.png','.jpg','.icon','.gif'],
                    typeLength = fileSuffixArray.length;
                
                for(var n = 0; n < typeLength; n++) {
                    if(file.indexOf(fileSuffixArray[n]) > -1) {
                        result.push(currentPath);
                        break;
                    }
                }
            }
                    
        })
    }
    
    makeResult(sourth);

    return divide ? resultMap : result;
}