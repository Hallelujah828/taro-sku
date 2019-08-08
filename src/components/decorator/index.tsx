
import autobind from 'core-decorators/lib/autobind';
export { autobind };

/**
 * 函数在未运行完成前 锁死
 *
 * @export
 * @param {number} [time=200]
 * @returns {MethodDecorator}
 */
export function lock(): MethodDecorator {
    let runing = false;
    return (_target, _name, descriptor: any) => {
        const fun = descriptor.value;
        descriptor.value = async function (...args) {
            if (!runing) {
                runing = true;
                try {
                    await fun.apply(this, args);
                } catch (error) {
                    // eslint-disable-next-line require-atomic-updates
                    runing = false;
                    throw error;
                }
                // eslint-disable-next-line require-atomic-updates
                runing = false;
            }
        };
        return descriptor;
    };
}

/**
 * 多少秒才能发送一次 限流
 *
 * @export
 * @param {number} [time=100]
 * @returns {MethodDecorator}
 */
export function throttle(time: number = 200): MethodDecorator {
    let date = new Date();
    return (_target, _name, descriptor: any) => {
        const fun = descriptor.value;
        descriptor.value = function (...args) {
            const now = new Date();
            if (now.getTime() - date.getTime() > time) {
                date = now;
                fun.apply(this, args);
            }
        };
        return descriptor;
    };
}

/**
 * 延迟触发  多次提交，提交最后一次
 *
 * @export
 * @param {number} [time=10]
 * @returns {MethodDecorator}
 */
export function debounce(time: number = 200): MethodDecorator {
    let st;
    return (_target, _name, descriptor: any) => {
        const fun = descriptor.value;
        descriptor.value = function (...args) {
            clearTimeout(st);
            st = setTimeout(() => {
                fun.apply(this, args);
            }, time);
        };
        return descriptor;
    };
}
