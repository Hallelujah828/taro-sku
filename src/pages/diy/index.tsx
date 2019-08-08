import { Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import global from '../../globalStore';
import './index.scss';
import { autobind } from '~/components/decorator';

class DiyComponent extends Component {
    render() {
        return (
            <View className="content">
                <Text>DiyComponent</Text>
            </View>
        );
    }
}

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
    config: Config = {
        navigationBarTitleText: '坑点'
    };

    onClickCouter() {
        global.counter++;
    }

    onItemClick(id) {
        const obj = global.list.find(value => value.id === id);
        obj && (obj.text += '+');
    }

    renderIfElse() {
        if (global.counter > 0) {
            return <View>
                <Text>renderIfElse</Text>
            </View>;
        } else if ((global.counter <= 0)) {
            return <Text>renderIfElse</Text>;
        }
        //  else {
        //   return <Text>renderIfElse</Text>
        // }
    }

    renderSwitch() {
        switch (global.counter) {
            case 0: { return <View><Text>renderSwitch1</Text></View> }
            case 1: { return <View><Text>renderSwitch2</Text></View> }
            // 不能包含 default
            // default:
            //   { return <View><Text>renderSwitch3</Text></View> }
        }
    }

    render() {
        return (
            <View className="content">
                <Text>{this.config.navigationBarTitleText}</Text>
                {
                /*
                 * 直接赋值的值也不会触发刷新
                 */
                }
                <View onClick={this.onClickCouter}>
                    {global.counter}
                </View>
                {
                /*
                 * 数组不管怎么写都不会触发刷新
                 */
                }
                {global.list.map((value, index) => <View key={index} onClick={() => this.onItemClick(value.id)}>
                    <Text>item:{value.text}</Text>
                </View>)}

                {
                /*
                 * 组件必须另起文件导出
                 */
                }
                <DiyComponent />

                {this.renderIfElse()}

                {this.renderSwitch()}

            </View>
        );
    }
}

export default Index as ComponentType;
