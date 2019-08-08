import Taro from '@tarojs/taro';
import URLSearchParams from 'url-search-params';
import request, { RequestEventEnum } from '~/components/request';

function extendTaroNavigate() {
    function getExtendFuntion(oldFunction) {
        return function extendFunction(parameter) {
            if (parameter.params) {
                parameter.url += '?' + new URLSearchParams(parameter.params).toString();
            }
            return oldFunction.bind(this)(parameter);
        };
    }

    Taro.navigateTo = getExtendFuntion(Taro.navigateTo);
    Taro.redirectTo = getExtendFuntion(Taro.redirectTo);
    Taro.reLaunch = getExtendFuntion(Taro.reLaunch);
}

function injectionTokenListener(params: Taro.request.Param<string | any>) {
    params.header = {
        ...params.header,
        Authorization: Taro.getStorageSync('token')
    };
}

function injectionToken(token = Taro.getStorageSync('token')) {
    if (token !== '') {
        Taro.setStorageSync('token', token);
        request.eventEmitter.addListener(RequestEventEnum.WillSend, injectionTokenListener);
    }
}

function delInjectionToken() {
    Taro.removeStorageSync('token');
    request.eventEmitter.removeListener(RequestEventEnum.WillSend, injectionTokenListener);
}

function watchRequest() {
    request.eventEmitter.addListener(RequestEventEnum.Receive, (req) => {
        switch (req.statusCode) {
            case 401:
                Taro.navigateTo({
                    url: '/pages/login/index'
                });
                break;
        }
    });
}

/**
 * app初始化
 *
 * @export
 */
export default function mount() {
    extendTaroNavigate();
    injectionToken();
    watchRequest();
}

/**
 * app退出
 *
 * @export
 */
export function unMount() {
    delInjectionToken();
}
