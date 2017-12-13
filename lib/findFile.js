var fs = require('fs');
var path = require('path');

module.exports = function (sourth, divide) {
    // 静态资源存储在同一台 cdn 服务器
    var result = [],
        // 静态资源存储在多台 cdn 服务器
        resultMap = {
            jsFile: [],
            cssFile: [],
            imgFile: []
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
            } else {
                // 按照文件类型将文件进行归类
                
                if (file.indexOf('.js') > -1) {
                    if(divide) {
                        resultMap.jsFile.push(currentPath);
                    } else {
                        result.push(currentPath);
                    }
                }

                if (file.indexOf('.css') > -1) {
                    if(divide) {
                        resultMap.cssFile.push(currentPath);
                    } else {
                        result.push(currentPath);
                    }
                }

                if (file.indexOf('.png') > -1 || file.indexOf('.jpg') > -1) {
                    if(divide) {
                        resultMap.imgFile.push(currentPath);
                    } else {
                        result.push(currentPath);
                    }
                }
            }
        
        })
    }
    
    makeResult(sourth, divide);

    // 返回结果
    return divide ? resultMap : result;
}