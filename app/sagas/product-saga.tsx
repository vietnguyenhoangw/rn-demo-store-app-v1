import {call, put} from 'redux-saga/effects';

// Functions
import {useNetworkActivityStatusBar} from '@/utils';

// Redux
import {AppActions, ProductActions} from '@/redux';
import { Alert } from 'react-native';

export function* getProductSaga(api: any, action: any): any {
  try {
    useNetworkActivityStatusBar();
    const response = yield call(api.getProductApi);
    useNetworkActivityStatusBar();
    if (response.ok && response.status === 200) {
      yield put(ProductActions.getProductSuccess(response?.data));
      action?.success && action?.success()
    } else {
      yield put(ProductActions.getProductFailure());
      Alert.alert("Lỗi, kết nối máy chủ thất bại.")
    }
  } catch (error) {
    yield put(ProductActions.getProductFailure(error));
    Alert.alert("Lỗi, kết nối máy chủ thất bại.")
  }
}
