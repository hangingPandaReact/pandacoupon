import fireAjax from '../axios/api';
import ApiUrl from '../axios/url';

export const ApiService = {
  login: async payload => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.userLogin}`,
      data: payload,
    });
  },
  register: async payload => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.userRegister}`,
      data: payload,
    });
  },
  getCategory: async (token) => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getCategory}`,
      token
    });
  },
  getCoupon: async ({token, additionalUrl}) => {
    return fireAjax({
      method: 'GET',
      URL:  additionalUrl ? `${ApiUrl.getCoupon}?${additionalUrl}` :`${ApiUrl.getCoupon}`,
      token
    });
  },
  getUser: async token => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getUser}`,
      token
    });
  },
  redeemCoupon: async (payload,token) => {
    return fireAjax({
      method: 'POST',
      URL: `${ApiUrl.redeem}`,
      data: payload,
      token
    });
  },
  getRedeemData: async (data,token) => {
    return fireAjax({
      method: 'GET',
      URL: `${ApiUrl.getRedeem}`,
      token
    });
  },
};
