/* eslint-disable no-console */
import { Button, Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import global from '~/globalStore';
import './index.less';

@observer
class Index extends Component {
    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '首页'
    };

    state = {
        getDataString: '',
        postDataString: '',
        list: [{ xxx: 'a' }, 1, 2, 4, 5]
    };

    onClick() {
        Taro.showToast({
            title: '点击事件'
        });
    }

    /**
     * 组件第一次渲染完成
     *
     * @memberof Index
     */
    async componentDidMount() {
        //
    }

    /**
     * 组件即将销毁
     *
     * @memberof Index
     */
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    /**
     * 跳转别的页面时生命周期  相对于微信小程序生命周期onHide
     *
     * @memberof Index
     */
    componentDidHide() {
        console.log('componentDidHide');
    }

    /**
     * 跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
     *
     * @memberof Index
     */
    componentDidShow() {
        console.log('componentDidShow');
    }

    /**
     * 装饰器 @observer 注入的生命周期，mobx数据修改
     *
     * @memberof Index
     */
    componentWillReact() {
        console.log('componentWillReact');
    }

    renderItem(item: { xxx: string } | number) {
        const type = typeof item;
        if (type === 'object') {
            return <View>
                <Text>{(item as { xxx: string }).xxx}</Text>
            </View>;
        } else if (type === 'number') {
            return <View>
                <Text>{item}</Text>
            </View>;
        }
    }

    onClickNavigateTo() {
        Taro.navigateTo({
            url: '/pages/request/index',
            params: {
                xxx: 1
            }
        });
    }

    render() {
        const { list, getDataString, postDataString } = this.state;
        const { user: { userName }} = global;
        return (
            <View className="index">
                <View>
                    <Text>用户名:{userName}</Text>
                </View>
                <View onClick={this.onClick}>点击事件</View>
                <View>
                    <Text>get:{getDataString}</Text>
                </View>
                <View>
                    <Text>post:{postDataString}</Text>
                </View>
                <View>
                    {list.map(value => this.renderItem(value))}
                </View>
                <Button onClick={this.onClickNavigateTo}>请求页面</Button>
            </View>
        );
    }
}

export default Index as ComponentType;
