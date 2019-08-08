import { Text, View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import './index.scss';
import global from '../../globalStore';
import { observer } from '@tarojs/mobx';
import { DiyComponent } from './components/diyCompont';

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

@observer
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '绕坑'
    };

    onClickCouter() {
        global.counter++;
    }

    onItemClick(id) {
        const obj = global.list.find(value => value.id === id);
        obj && (obj.text += '+');
        global.listUpdate++;
    }

    render() {
        const { counter, listUpdate } = global;
        return (
            <View className="content">
                <Text>{this.config.navigationBarTitleText}</Text>
                {
                /*
                 * 先定义再赋值
                 */
                }
                <View onClick={this.onClickCouter}>
                    {counter}
                </View>

                {
                /*
                 * 改变别的值用来做刷新
                 */
                }
                {global.list.map((value, index) => <View key={index} onClick={() => this.onItemClick(value.id)}>
                    <Text>item:{value.text}</Text>
                </View>)}
                <Text className="hide">{listUpdate}</Text>

                <DiyComponent></DiyComponent>
            </View>
        );
    }
}

export default Index as ComponentType;
