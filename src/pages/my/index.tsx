import { Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import './index.scss';
import { autobind } from '~/components/decorator';

interface PageStateProps {
    global: {
        counter: number;
        increment: Function;
        decrement: Function;
        incrementAsync: Function;
    };
}

interface Index {
    props: PageStateProps;
}

@autobind
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
        navigationBarTitleText: '我的',
        enablePullDownRefresh: true
    };

    onPullDownRefresh() {
        console.log(2);

        setTimeout(() => {
            // 停止下拉动作
            // tslint:disable-next-line: semicolon
            Taro.stopPullDownRefresh();
        }, 1000);
    }

    render() {
        return (
            <View className="content">
                <Text>{this.config.navigationBarTitleText}</Text>
            </View>
        );
    }
}

export default Index as ComponentType;
