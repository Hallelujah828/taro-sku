import { Text, View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { AtButton, AtProgress } from 'taro-ui';
import { autobind, lock, debounce, throttle } from '~/components/decorator';
import './index.scss';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '组件'
    };

    state = {
        percent: 0,
        loadding: false
    };

    componentDidMount() {
        console.log('this.$router', this.$router.params);
    }

    render() {
        const { loadding, percent } = this.state;
        return (
            <View className="content">
                <Text>{this.config.navigationBarTitleText}</Text>
                <View>
                    <AtButton type="primary" loading={loadding} onClick={this.onLockClick}>lock按钮</AtButton>
                </View>
                <View>
                    <AtProgress percent={percent} />
                    <AtButton type="primary" loading={loadding} onClick={this.onThrottleClick}>throttle按钮</AtButton>
                </View>
                <View>
                    <AtButton type="primary" loading={loadding} onClick={this.onDebounceClick}>debounce按钮</AtButton>
                </View>
            </View>
        );
    }

  @lock()
    onLockClick() {
        this.setState({ loadding: true });
        Taro.showToast({ title: '点击' });
        return new Promise(reslove => {
            setTimeout(() => {
                this.setState({ loadding: false });
                reslove();
            }, 5000);
        });
    }

  @throttle(1000)
  onThrottleClick() {
      this.setState((state: any) => ({
          percent: state.percent + 1
      }));
  }

  @debounce(1000)
  onDebounceClick() {
      this.setState((state: any) => ({
          percent: state.percent + 1
      }));
  }
}

export default Index as ComponentType;
