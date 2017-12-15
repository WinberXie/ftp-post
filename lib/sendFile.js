var Client = require('ftp');
var path  = require('path');
var colors = require('colors');

module.exports = function (sourth, config, prefix, originPrefix) {
    var isWindows = process.platform == 'win32';
    var client = new Client(); 
    var errArray = [];
    var failArray = [];

    var rePut = function () {
        var length = errArray.length;

        if(length) {
            errArray.forEach(function(item) {
                client.put(item.sourth, item.target, function(err) {
                    
                    if(err) {
                        failArray.push(item.sourth);
                    } else {
                        var log = item.sourth + '上传成功';
                        console.log(log.green);
                    }

                    !--length && endClient();
                })
            })
        } else {
            endClient()
        }
    }
    // 关闭连接
    var endClient = function() {
        errArray.forEach(function(item) {
            var log = item + '上传失败';
            console.warn(log.red);
        })
        client.end();
    }
    // 上传文件
    var sendFtpFile = function() {
        var fileNum = sourth.length;
        // 文件上传
        sourth.forEach(function(item) {
            var target = item.replace(prefix, '');

            target = path.join(originPrefix, target);
            target = isWindows ? target.replace(/\\/g, '/') : target;
            
            if(target.charAt(0) == '/'){
                target = target.replace('/', '');
            }
            
            (function(item, target) {
                client.put(item, target, function(err) {
                    if(err) {
                        errArray.push({
                            sourth: item,
                            target: target
                        });
                    } else {
                        var log = item + '上传成功';
                        console.log(log.green);
                    }

                    !--fileNum && rePut();
                })
            })(item, target)
        })
    };

    // 远程创建目录
    var makeOriginPath = function () {
        var num = sourth.length;
        var sourthArray = [];

        // 目录去重
        for (var i = 0; i < num; i++) {
            // 处理windows系统的路径分隔符
            var target = sourth[i].replace(prefix, '');
            
            target = path.join(originPrefix, target);
            target = isWindows ? target.replace(/\\/g, '/') : target;
            target = target.substring(0, target.lastIndexOf('/'));

            if(target.charAt(0) == '/'){
                target = target.replace('/', '');
            }
                 
            if(sourthArray.indexOf(target) == -1) {
                sourthArray.push(target);
            }
        }

        // 需要创建的目录总数
        var num = sourthArray.length;

        // 创建目录
        for (var i = 0; i < num; i++) {   
            (function(item) {
                client.list(item, function(err, list) {
                    if (err) throw err;

                    // 目录不存在则创建目录
                    if (!list || list.length < 1) {
                        client.mkdir(item, true, function() {
                            console.log('创建目录 ' + item);
                            !--num && sendFtpFile();
                        });
                    } else {
                        !--num && sendFtpFile();
                    }
                })
            })(sourthArray[i]);
        }
    };

    // 连接成功后创建目录并上传文件
    client.on('ready', function() {
        makeOriginPath();
    });

    // 连接 ftp 服务器
    client.connect(config);
}