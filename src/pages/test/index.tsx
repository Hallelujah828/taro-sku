import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '~/components/decorator';
import * as styles from './index.module.scss';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: 'test'
    };

    state = {

    };

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    componentDidMount() {
        // eslint-disable-next-line no-console
        console.log('this.$router', this.$router.params);
    }

    render() {
        return (<View className={styles.page}>

        </View>);
    }
}

export default Index as ComponentType;

