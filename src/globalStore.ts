import { observable } from 'mobx';

export const observableValue = {
    user: { userName: 'userName', userId: 'xxxxxx' },

    counter: 0,
    list: [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }],
    listUpdate: 0,

    counterStore() {
        this.counter++;
    },
    increment() {
        this.counter++;
    },
    decrement() {
        this.counter--;
    },
    incrementAsync() {
        setTimeout(() => {
            this.counter++;
        }, 1000);
    }
};

const counterStore = observable(observableValue);
export default counterStore;
