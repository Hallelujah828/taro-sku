interface IEventObject<T> {
    /**
     * 添加的方法用于对比删除
     *
     * @type {IListener}
     * @memberof IEventObject
     */
    addListener: T;

    /**
     * 用来运行
     *
     * @type {IListener}
     * @memberof IEventObject
     */
    listener: any;
}

export type IEventList<T> = {
    [K in keyof T]?: (IEventObject<T[K]>[])
};

export interface IFunction {
    [K: string]: (...params) => void;
    [K: number]: (...params) => void;
}

export default class EventEmitter<T extends IFunction> {
    /**
     * 监听列表
     *
     * @type {IEventList[]}
     * @memberof EventEmitter
     */
    private eventList: IEventList<T> = {};

    /**
     * 当前key
     *
     * @type {T}
     * @memberof EventEmitter
     */
    private currentKey: keyof T;

    /**
     * 当前监听事件
     *
     * @type {IListener}
     * @memberof EventEmitter
     */
    private currentEvent: IEventObject<T[keyof T]>;

    /**
     * 添加监听
     *
     * @param {string} type
     * @param {IEventFunction} listener
     * @returns {EventEmitter}
     * @memberof EventEmitter
     */
    addListener<K extends keyof T>(key: K, listener: T[K & keyof T]) {
        if (!this.eventList[key]) {
            this.eventList[key] = [];
        }

        const event = {
            addListener: listener,
            listener
        };
        (this.eventList[key] as IEventObject<T[K]>[]).push(event);
    }

    /**
     * 只运行一次的监听
     *
     * @returns
     * @memberof EventEmitter
     */
    once<K extends keyof T>(key: K, listener: T[K & keyof T]) {
        if (!this.eventList[key]) {
            this.eventList[key] = [];
        }
        const event = {
            addListener: listener,
            listener: async (...param) => {
                this.removeListener(key, listener);
                await listener(...param);
            }
        };
        (this.eventList[key] as IEventObject<T[K]>[]).push(event);
    }

    /**
     * 触发事件
     *
     * @param {string} key
     * @param {...any[]} params
     * @memberof EventEmitter
     */
    emit<K extends keyof T>(key: K, ...params: any[]) {
        const funArray = [];

        if (this.eventList[key as any]) {
            this.currentKey = key;
            for (const eventObject of (this.eventList[key] as IEventObject<T[K]>[])) {
                this.currentEvent = eventObject;
                (funArray as any).push(eventObject.listener(...params));
            }
        }

        return Promise.all(funArray);
    }

    /**
     * 删除指定监听
     *
     * @param {T} key
     * @param {(...args: any[]) => any} listener
     * @memberof EventEmitter
     */
    removeListener<K extends keyof T>(key: K, listener: T[K & keyof T]) {
        const list = this.eventList[key];

        if (list) {
            const index = list.findIndex(value => value.addListener === listener);
            if (index !== -1) {
                list.splice(list.findIndex(value => value.addListener === listener), 1);
            }
        }
    }

    /**
     * 删除所有监听
     *
     * @param {T} [key]
     * @returns
     * @memberof EventEmitter
     */
    removeAllListeners<K extends keyof T>(key: K) {
        if (key) {
            this.eventList = {};
        } else {
            delete this.eventList[key];
        }
    }

    /**
     * 移除当前事件
     *
     * @memberof EventEmitter
     */
    removeCurrentListener() {
        if (this.currentKey !== null && this.currentEvent) {
            this.removeListener(this.currentKey, this.currentEvent.addListener);
        }
    }

    /**
     * 返回监听函数数量
     *
     * @memberof EventEmitter
     */
    listenerCount<K extends keyof T>(key: K) {
        const events = this.eventList[key];
        if (events) {
            return events.length;
        }
        return 0;
    }
}
