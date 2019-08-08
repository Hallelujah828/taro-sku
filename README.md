# 小程序开发模板

## taro环境安装

npm install -g @tarojs/cli  
npm install -g mirror-config-china  

## 安装

```sh
yarn install
```

## 调试

```sh
yarn dev
```

## 打包

```sh
yarn build
```

## 编写tools

```sh
npm install -g typescript
tsc -watch
```

## vscode 插件安装

ESLint
CSS Modules
Document This

## 目录结构说明

    config:taro 配置  
    dist:打包目录  
    src:开发目录  
        components:组件（全局组件，全局方法）  
            assets:放置公用静态文件  
            decorator:装饰器  
            request:请求组件  
            taro-ui-styles:组件样式  
            utils:公用函数
        pages:页面  
            _template:页面模版  
        app.scss:样式入口  
        app.tsx:js入口  
        config.ts:配置文件  
        globalStore.ts:全局数据
        index.html:html5项目的入口  
        tools:帮助项目开发的脚本目录  

## vscode配置

默认vscdoe的eslint不会检测tsx文件，不会自动修复，需要手动开启

```json
"eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ],
```

## 其他

AppID  
接口文档地址  

## 资料

https://wangdoc.com/javascript/  
http://es6.ruanyifeng.com/  
http://css.cuishifeng.cn/position.html  
https://nervjs.github.io/taro/docs/README.html  
https://taro-ui.aotu.io/#/docs/introduction  
https://react.docschina.org/  
https://www.tslang.cn/  
# taro-sku
