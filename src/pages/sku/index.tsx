import { View, Image } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import { ComponentType } from 'react';
import { autobind } from '~/components/decorator';
import * as styles from './index.module.scss';
import classNames from 'classnames';
import skuData from './good.json';

import closeImg from './images/close.png';
import addImg from './images/add.png';
import reduceImg from './images/reduce.png';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: 'sku'
    };

    state: {
        showMask: boolean;
        skuSpecList: any[];
        goodDetail: any;
        selected: object;
        skuImg: any;
        quantity: number;
        skuNo: string;
        shopCartCount: number;
        addGoodCount: number;
        curentSkuId: string[];
        showPanel: boolean;
        data: any;
    } = {
        showMask: true,
        skuSpecList: [],
        goodDetail: {},
        selected: {},
        skuImg: '',
        quantity: 1,
        skuNo: '',
        shopCartCount: 0,
        addGoodCount: 1,
        curentSkuId: [],
        showPanel: true,
        data: {}
    };
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    componentDidMount() {
        this.loadDetail();
    }
    async loadDetail() {
        const data = skuData;
        // eslint-disable-next-line
        console.log(data);
        const skuSpecList = [] as any[];
        data.goodsSpecRelationList.forEach(item => {
            if (item.pid === 0) {
                item.skuSpecValueList = [];
                skuSpecList.push(item);
            }
        });
        // eslint-disable-next-line
        console.log(skuSpecList);
        skuSpecList.forEach((item, index) => {
            data.goodsSpecRelationList.forEach(relItem => {
                if (relItem.pid === item.specId) {
                    item.skuSpecValueList.push({ ...relItem, index });
                }
            });
        });
        this.setState({
            goodDetail: data,
            skuSpecList
        });
    }
    // 判断是否可选
    isValid = (item) => {
        return true;
        // const pSelectedId = this.state.curentSkuId[item.index - 1];
        // if (pSelectedId === undefined) {
        //     return true;
        // }
        // return !!this.state.goodDetail.goodsSkuDetailList.filter((_value, index) => index === 0).find(value => {
        //     const idArray = value.specIds.split(',').map(value => Number(value));
        //     return idArray[item.index] === item.specId && idArray[item.index - 1] === pSelectedId;
        // });
    };
    isSelected = (item, specId) => {
        return this.state.selected[specId] === item.specId;
    };
    handleSelect(item, specId) {
        const { skuSpecList } = this.state;
        const selected = {
            ...this.state.selected,
            [specId]: item.specId
        };
        const id = Object.keys(selected).map(key => selected[key]).join(',');
        const curentSkuId = [...this.state.curentSkuId];
        curentSkuId[item.index] = item.specId;
        this.setState({
            selected,
            curentSkuId
        });
        if (Object.keys(selected).length === skuSpecList.length) {
            const { goodDetail } = this.state;
            const skuNOIndex =  goodDetail.goodsSkuDetailList.findIndex(item => item.specIds === id);
            const { skuNo, skuImg } = goodDetail.goodsSkuDetailList[skuNOIndex];
            this.setState({
                skuNo,
                skuImg
            });
        }
        // eslint-disable-next-line
        console.log(selected);
    }
    render() {
        const { showMask, skuSpecList, goodDetail, quantity, skuImg, showPanel, addGoodCount } = this.state;
        return (
            <View className={styles.page}>
                <View className={classNames(styles.comMask, { [`${styles.comShow}`]: showMask })}></View>
                <View className={classNames(styles.selectPanel, { [`${styles.expandPanel}`]: showPanel && addGoodCount }, { [`${styles.collapsePanel}`]: !showPanel && addGoodCount })}>
                    <Image src={closeImg} className={classNames(styles.closeImg)} />
                    <View className={classNames(styles.panelTop)}>
                        <Image src={skuImg || goodDetail.coverImg} className={classNames(styles.panelTopImg)} mode="aspectFill" />
                        <View className={classNames(styles.swiperItemName, styles.panelTopName, 'txt-ellipsis')}>{goodDetail.goodsName}</View>
                        <View className={classNames(styles.swiperPrice)}>¥ {goodDetail.wholesalePrice}</View>
                    </View>
                    {skuSpecList.map((skuSpecItem) => <View key={skuSpecItem.specId}>
                        <View className={styles.specNameTop}>{skuSpecItem.specName}</View>
                        <View className={classNames(styles.classBtnsWrap, 'at-row at-row--wrap')}>
                            {
                                skuSpecItem.skuSpecValueList.map((specItem) => <View key={specItem.specId} className={classNames(styles.btnItemWrap)}>
                                    <AtButton disabled={!this.isValid(specItem)} type={this.isSelected(specItem, skuSpecItem.specId) ? 'primary' : 'secondary'} size="small" onClick={this.handleSelect.bind(this, specItem, skuSpecItem.specId)}>{specItem.specName}</AtButton>
                                </View>)
                            }
                        </View>
                    </View>)}
                    <View className={classNames(styles.numWrap, 'at-row at-row__justify--between')}>
                        <View className={classNames('at-col')}>数量</View>
                        <View className={classNames('at-row at-row__justify--end')}>
                            <Image src={reduceImg} className={styles.computeImg} />
                            <View className={styles.opreateNum}>{quantity}</View>
                            <Image src={addImg} className={styles.computeImg} />
                        </View>
                    </View>
                    <View className={classNames(styles.btnWrapPadding, 'at-row at-row__justify--between')}>
                        <View className={classNames(styles.btnItemWidth)}>
                            <AtButton type="secondary" size="normal">加入购物车</AtButton>
                        </View>
                        <View className={classNames(styles.btnItemWidth)}>
                            <AtButton type="primary">立即购买</AtButton>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Index as ComponentType;
