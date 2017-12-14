# ftp-post

* 作者：winber
* 邮箱：winberxie@163.com
* 版本：**`1.0.0`**

## 介绍

上传的静态资源到cdn服务器的插件包

---

## 安装

`ftp-post` 使用 `npm` 是进行管理
```
npm i ftp-post
```

- 如果你还没有安装 `npm`，可通过以下方式进行 [安装](https://nodejs.org/en/download/)。
- 安装cnpm `npm install -g cnpm --registry=https://registry.npm.taobao.org`

---

## 使用

- 所有静态资源都在同一台cdn服务器

```
var ftpPost = require('ftp-post');

ftpPost({
    sourth: '/Users/winber/Desktop/calcu',
    config : {
        host: '主机名称',
        user: '用户名',
        password: '密码'
    }
})

```
- 所有静态资源上传到cdn服务器的 /static 目录下

```
var ftpPost = require('ftp-post');

ftpPost({
    sourth: '/Users/winber/Desktop/calcu',
    config : {
        host: '主机名称',
        user: '用户名',
        password: '密码'
    },
    originPrefix: 'static'
})

```




- 根据后缀名分类并分开上传到不同的cdn服务器

```
var ftpPost = require('ftp-post');

// 分开上传
ftpPost({
    sourth: '/Users/winber/Desktop/calcu',
    config : {
        config1: {
            ftpConfig: {
                host: '主机名称',
                user: '用户名',
                password: '密码'
            },
            suffix: '.js|.css'
        },
        
        config2: {
            ftpConfig: {
                host: '主机名称',
                user: '用户名',
                password: '密码'
            },
            suffix: '.png|.jpg'
        }
    },
    divide: true
})
```


- 根据后缀名分类并分开上传到不同的cdn服务器的 /static 目录下

```
var ftpPost = require('ftp-post');

// 分开上传
ftpPost({
    sourth: '/Users/winber/Desktop/calcu',
    config : {
        config1: {
            ftpConfig: {
                host: '主机名称',
                user: '用户名',
                password: '密码'
            },
            suffix: '.js|.css'
        },
        
        config2: {
            ftpConfig: {
                host: '主机名称',
                user: '用户名',
                password: '密码'
            },
            suffix: '.png|.jpg'
        }
    },
    divide: true,
    originPrefix: 'static'
})
```


###  ftpPost配置参数

| params | Type | Default | Description |
| ---- |:----:|:-------:| :----------:|
| **`sourth `** | `String` | `undefined` | 所要上传的文件夹的绝对路径 不能为空|
| **`config`** | `Object` | `undefined ` | cdn服务器相关的参数 不能为空|
| **`divide `** | `Boolean` | `false ` | 是否按照文件类型上传到不同的cdn服务器|
| **`originPrefix `** | `String` | `''` | 远程目录的前缀 |



---


## 注意事项

- 当使用根据文件类型上传的时候, config 需要配置相应的链接服务器需要的参数
- 上传的目标文件夹为绝对路径
- 当使用文件归类上传的时候需要配置 divide 参数为 true
- 上传是将目标文件夹下面的所有文件上传到cdn服务器并不包含目标文件夹这一级目录

---


## Changelog

### 1.0.0
1. init

---
