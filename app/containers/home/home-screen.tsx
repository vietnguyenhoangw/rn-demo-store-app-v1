import React, {useRef, useState, memo, useEffect} from 'react';
import {Alert, FlatList, RefreshControl, TouchableOpacity} from 'react-native';

// Styles
import styles from './styles';

// Components
import {
  CText,
  CView,
  CButton,
  CBaseView,
  CAlertModal,
  CMediaSlider,
  CScreenHeader,
  CImage,
  CDefaultLoading,
} from '@/components';

// Theme
import {Images, Metrics} from '@/theme';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '@/redux';

const HomeScreen = memo((props: any) => {
  const dispatch = useDispatch();
  const productState = useSelector((state: any) => state?.product);
  const products = productState?.products;
  const isFetchingGetProducts = productState?.isFetchingGetProducts;

  useEffect(() => {
    dispatch(ProductActions.getProductRequest());
  }, []);

  const onRefresh = (): void => {
    dispatch(ProductActions.getProductRequest());
  };

  const onPressProductItem = (item: any): void => {
    props?.navigation.navigate('ProductDetailScreen', {
      item: item,
    });
  };

  const onPressCart = () => {
    props?.navigation.navigate('ProductCartScreen');
  };

  const renderItem = ({item}: any): object | any => {
    return (
      <TouchableOpacity onPress={() => onPressProductItem(item)}>
        <CView
          style={{
            width: Metrics.screenWidth / 2,
            justifyContent: 'center',
            marginBottom: 16,
            paddingHorizontal: 8,
          }}>
          <CImage
            source={item?.productImage}
            styles={{width: Metrics.screenWidth / 2, height: 100}}
          />
          <CText
            text={item?.name}
            numberOfLines={1}
            style={{textAlign: 'left', fontWeight: 'bold'}}
          />
          <CText
            text={item?.description}
            style={{
              textAlign: 'left',
              fontSize: 10,
              marginTop: 4,
              color: 'gray',
            }}
            numberOfLines={2}
          />
          <CText
            text={`${item?.price} đ`}
            numberOfLines={1}
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 4,
              color: 'gray',
            }}
          />
        </CView>
      </TouchableOpacity>
    );
  };

  const buildHeaderProductList = (): object | any => {
    return (
      <CView>
        <CImage
          source={
            'https://cdn.tgdd.vn/bachhoaxanh/banners/3333/banner-landingpage-3333-19052022151928.jpg'
          }
          styles={{width: Metrics.screenWidth, height: 200, marginBottom: 24}}
          resizeMode={'contain'}
        />
        <CText
          text={'Sản phẩm nổi bật'}
          numberOfLines={1}
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            marginLeft: 8,
            fontSize: 18,
            marginBottom: 16,
          }}
        />
      </CView>
    );
  };

  const buildBottomProductList = (): object | any => {
    return (
      <CView>
        <CText
          text={'Sản phẩm bán chạy'}
          numberOfLines={1}
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            marginLeft: 8,
            fontSize: 18,
            marginBottom: 16,
          }}
        />
        <FlatList
          horizontal
          data={products}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </CView>
    );
  };

  return (
    <CBaseView containerStyle={{flex: 1}}>
      <CScreenHeader
        title={'Sản phẩm'}
        leftIcon2Src={Images.WhiteBackGround}
        rightIcon2Src={Images.ShoppingCart}
        iconStyle={{height: 28, width: 28}}
        numberOfRightIcon2={productState?.cartList?.length + '' || '0'}
        onRightIcon2Press={onPressCart}
      />
      {!isFetchingGetProducts ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={buildHeaderProductList}
          ListFooterComponent={buildBottomProductList}
          style={{paddingTop: 16}}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      ) : (
        <CDefaultLoading />
      )}
    </CBaseView>
  );
});

export default HomeScreen;
