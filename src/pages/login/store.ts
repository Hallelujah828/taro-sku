import { observable } from 'mobx'


export let storeObject = {
}

const store = observable(storeObject);
// 如果需要使用还需在app.tsx 页面里导入到store中 key不重复即可
export default store;
