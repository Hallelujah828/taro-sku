import '@tarojs/async-await';
import { Provider } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './app.scss';
import global from './globalStore';
import mount from './lifeCycle';
import Index from './pages/index';
import pagesIndexStore from './pages/index/store';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
    global,
    pagesIndexStore
};

class App extends Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: [
            'pages/sku/index',
            'pages/index/index',
            'pages/my/index',
            'pages/roll/index',
            'pages/diy/index',
            'pages/login/index',
            'pages/test/index',
            'pages/request/index',
            'pages/cart/index'
        ],
        tabBar: {
            list: [{
                'iconPath': './components/assets/images/icon-index-select.png',
                'selectedIconPath': './components/assets/images/icon-index-selected.png',
                'pagePath': 'pages/index/index',
                'text': '首页'
            }, {
                'iconPath': './components/assets/images/icon-index-select.png',
                'selectedIconPath': './components/assets/images/icon-index-selected.png',
                'pagePath': 'pages/roll/index',
                'text': '组件'
            }, {
                'iconPath': './components/assets/images/icon-customer-select.png',
                'selectedIconPath': './components/assets/images/icon-customer-selected.png',
                'pagePath': 'pages/diy/index',
                'text': '坑'
            }, {
                'iconPath': './components/assets/images/icon-index-select.png',
                'selectedIconPath': './components/assets/images/icon-index-selected.png',
                'pagePath': 'pages/cart/index',
                'text': '绕坑'
            }, {
                'iconPath': './components/assets/images/icon-main-select.png',
                'selectedIconPath': './components/assets/images/icon-main-selected.png',
                'pagePath': 'pages/my/index',
                'text': '下拉刷新'
            }]
        },
        window: {
            // 默认颜色不显示下拉加载的loading图片
            backgroundTextStyle: 'dark',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
    };

    globalData = {
        userInfo: null
    };

    /**
     * 程序初始化
     *
     * @memberof App
     */
    constructor() {
        super();
        mount();
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById('app'));
