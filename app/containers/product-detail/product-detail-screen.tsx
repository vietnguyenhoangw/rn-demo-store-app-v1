import React, {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';

// Styles
import styles from './styles';

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
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {ProductActions} from '@/redux';

function ProductDetailScreen({route, navigation}: any) {
  const dispatch = useDispatch();
  const item = route?.params?.item;

  const productState = useSelector((state: any) => state?.product);

  const [quantity, setQuantity] = useState(0);

  const goBack = (): void => {
    navigation.goBack();
  };

  const onIncreaseQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  const onDecreaseQuantity = (): void => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const onPressCart = () => {
    navigation.navigate('ProductCartScreen');
  }

  const onPressAddCart = (): void => {
    if (quantity > 0) {
      dispatch(ProductActions?.addProductToCart({
        product: item,
        quantity: quantity
      }))
      setQuantity(0)
      Alert.alert("Đã thêm vào giỏ hàng")
    } else {
      Alert.alert("Vui lòng thêm số lượng muốn mua")
    }
  };

  const buildQuantityPicker = (): object => {
    return (
      <CView>
        <CView row style={{marginVertical: 18, alignSelf: 'flex-end'}}>
          <CView center>
            <CText
              text={'Số lượng'}
              style={{fontSize: 14, marginHorizontal: 12, fontWeight: 'bold'}}
            />
          </CView>
          <CButton
            onPress={onDecreaseQuantity}
            btnTitle="-"
            containerStyle={{width: 32, height: 32, backgroundColor: 'grey'}}
          />
          <CView center>
            <CText
              text={quantity + ''}
              style={{fontSize: 16, marginHorizontal: 16}}
            />
          </CView>
          <CButton
            onPress={onIncreaseQuantity}
            btnTitle="+"
            containerStyle={{width: 32, height: 32, backgroundColor: 'grey'}}
          />
        </CView>
      </CView>
    );
  };

  return (
    <CBaseView containerStyle={{flex: 1}}>
      <CScreenHeader
        title={'Chi tiết Sản phẩm'}
        leftIcon1Src={Images.X}
        rightIcon2Src={Images.ShoppingCart}
        iconStyle={{height: 28, width: 28}}
        numberOfRightIcon2={productState?.cartList?.length + "" || "0"}
        onLeftIcon1Press={goBack}
        onRightIcon2Press={onPressCart}
      />
      <ScrollView style={{paddingHorizontal: 24}}>
        <CImage
          source={item?.productImage}
          styles={{width: Metrics.screenWidth, height: 250, marginBottom: 24}}
          resizeMode={'contain'}
        />
        <CText
          text={item?.name}
          style={{textAlign: 'left', fontWeight: 'bold', fontSize: 24}}
        />
        {buildQuantityPicker()}
        <CText
          text={item?.description}
          style={{
            textAlign: 'left',
            fontSize: 14,
            color: 'gray',
            marginTop: 8,
          }}
        />
        <CButton
          onPress={onPressAddCart}
          btnTitle={'Thêm vào giỏ hàng'}
          containerStyle={{marginVertical: 48}}
        />
      </ScrollView>
    </CBaseView>
  );
}

export default ProductDetailScreen;
