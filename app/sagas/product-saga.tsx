import {call, put} from 'redux-saga/effects';

// Functions
import {useNetworkActivityStatusBar} from '@/utils';

// Redux
import {AppActions, ProductActions} from '@/redux';

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
      action?.failure && action?.failure()
    }
  } catch (error) {
    yield put(ProductActions.getProductFailure(error));
    action?.failure && action?.failure()
  }
}
