import React, {useState} from 'react';
import {View, TouchableOpacity, Alert, FlatList} from 'react-native';

// Component
import {
  CBaseView,
  CButton,
  CImage,
  CScreenHeader,
  CText,
  CView,
} from '@/components';

// Theme
import {Images, Metrics} from '@/theme';
import {useDispatch, useSelector} from 'react-redux';

// Redux
import {ProductActions} from '@/redux';
import isEmpty from 'lodash/isEmpty';

function ProductCartScreen({route, navigation}: any) {
  const dispatch = useDispatch();
  const productState = useSelector((state: any) => state?.product);

  const goBack = (): void => {
    navigation.goBack();
  };

  const onPressCartItem = (item: any): void => {
    navigation.navigate('ProductDetailScreen', {
      item: item,
    });
  };

  const onPressRemoveCartItem = (item: any): void => {
    dispatch(
      ProductActions?.removeProductFromCart({
        product: item,
      }),
    );
  };

  const onPressCharge = (): void => {};

  const renderItem = ({item}: any): object | any => {
    return (
      <TouchableOpacity onPress={() => onPressCartItem(item?.product)}>
        <CView
          row
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
          }}>
          <CImage
            source={item?.product?.productImage}
            styles={{width: Metrics.screenWidth / 3, height: 100}}
          />
          <CView style={{flex: 1, marginLeft: 8}}>
            <CText
              text={item?.product?.name}
              numberOfLines={1}
              style={{textAlign: 'left', fontWeight: 'bold'}}
            />
            <CText
              text={item?.product?.description}
              style={{
                textAlign: 'left',
                fontSize: 10,
                marginTop: 4,
                color: 'gray',
              }}
              numberOfLines={2}
            />
            <CText
              text={item?.product?.price + ' đ'}
              style={{
                textAlign: 'left',
                fontSize: 12,
                marginTop: 4,
                color: 'gray',
                fontWeight: 'bold',
              }}
              numberOfLines={2}
            />
            <CText
              text={'Số lượng: ' + item?.quantity}
              numberOfLines={1}
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                marginTop: 24,
                marginBottom: 16,
              }}
            />
          </CView>
          <CButton
            onPress={() => onPressRemoveCartItem(item)}
            btnTitle={'X'}
            containerStyle={{
              paddingLeft: 8,
              width: 32,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
            }}
            titleStyle={{
              fontWeight: 'bold',
              color: 'black',
            }}
          />
        </CView>
      </TouchableOpacity>
    );
  };

  return (
    <CBaseView containerStyle={{flex: 1}}>
      <CScreenHeader
        title={'Giỏ hàng'}
        leftIcon1Src={Images.X}
        rightIcon2Src={Images.WhiteBackGround}
        iconStyle={{height: 28, width: 28}}
        onLeftIcon1Press={goBack}
      />
      <FlatList
        data={productState?.cartList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{paddingTop: 16}}
      />
      {!isEmpty(productState?.cartList) && (
        <CButton
          onPress={onPressCharge}
          btnTitle={'Tiến hành thanh toán'}
          containerStyle={{marginVertical: 24, marginHorizontal: 16}}
        />
      )}
    </CBaseView>
  );
}

export default ProductCartScreen;
