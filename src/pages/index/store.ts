import { observable } from 'mobx'

export let storeObject = {
    list: [{ id: 1, text: '1' }, { id: 2, text: '2' }, { id: 3, text: '3' }]
}

const store = observable(storeObject)
export default store;
