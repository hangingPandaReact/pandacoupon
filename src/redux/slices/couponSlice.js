import { createSlice } from "@reduxjs/toolkit";
import {ApiService} from "../../api";
import {Toast, useToast} from 'native-base';

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    couponList: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    isRedeem:false,
    isRedeemCoupon:false,
  },
  reducers: {
    getCouponRequested: (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.isError = false;
    },
    getCouponSuccessful: (state, action) => {
      state.isLoading = false;
      state.couponList = action.payload.couponList;
    },
    getCouponFailed: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    redeemCouponRequested: (state, action) => {
      state.isRedeem = true;
      state.errorMessage = "";
      state.isError = false;
    },
    redeemCouponSuccessful: (state, action) => {
      state.isRedeem = false;
    },
    redeemCouponFailed: (state, action) => {
      state.isRedeem = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    getCouponRedeemRequested: (state, action) => {
      state.isRedeemCoupon = true;
      state.errorMessage = "";
      state.isError = false;
    },
    getCouponRedeemSuccessful: (state, action) => {
      state.isRedeemCoupon = false;
      state.couponList = action.payload.couponList;
    },
    getCouponredeemFailed: (state, action) => {
      state.isRedeemCoupon = false;
      state.errorMessage = action.payload.errorMessage;
      state.isError = true;
    },
    resetError: (state, action) => {
      state.isError = false
    },
    resetSlice: (state, action) => {
      state = {
        couponList: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
      }
    }
  },
});

export const {
  getCouponRequested,
  getCouponSuccessful,
  getCouponFailed,
  resetError,
  resetSlice,
  redeemCouponRequested,
  redeemCouponSuccessful,
  redeemCouponFailed,
  getCouponRedeemRequested,
  getCouponRedeemSuccessful,
  getCouponredeemFailed,
} = couponSlice.actions;

export default couponSlice.reducer;

export const getCoupon = () => {
  return async (dispatch, getState) => {
    dispatch(getCouponRequested());
    const {token} = getState().loginSlice;
    const {location}=getState().locationSlice
    //console.log(location.coords);
    try {
      const payload ={
        token,
        additionalUrl:`?uLat=${location?.coords?.latitude}&uLon=${location?.coords?.longitude}`}
      const res = await ApiService.getCoupon(payload);
      console.log(res);
      
      if (res.data.success) {
        dispatch(
          getCouponSuccessful({
            couponList: res.data.data,
          })
        );
      }
    } catch (e) {
      dispatch(
        getCouponFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};

export const getCouponRedeem = (_id) => {
  return async (dispatch, getState) => {
    dispatch(getCouponRedeemRequested());
    const {token, userData:{email}} = getState().loginSlice;
    token
    try {
      const res = await ApiService.getRedeemData({_id, userEmail:email},token);
      console.log(res,'ghfhgfhfhg');
      
      if (res.data.success) {
        dispatch(
          getCouponRedeemSuccessful()
        );
      }
    } catch (e) {
      dispatch(
        getCouponRedeemFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};

export const redeemCoupon = (_id) => {
  return async (dispatch, getState) => {
    dispatch(redeemCouponRequested());
    const {token, userData:{email}} = getState().loginSlice;
    try {
      const res = await ApiService.redeemCoupon({_id, userEmail:email},token);
      if (res.data.success) {
        dispatch(
          redeemCouponSuccessful()
        );
        Toast.show({
          title: 'Redeem Success',
          placement: 'top',
          status: 'success',
          duration: 3000,
          description: `Coupon is redeem`,
        });
      } else {
        dispatch(
          redeemCouponFailed({
            errorMessage: res.data.message || "Something went wrong",
          })
        ); 
        Toast.show({
          title: res.data.message || "Something went wrong",
          duration: 3000,
          placement: 'top',
          status: 'error',
        });
      }
    } catch (e) {
      dispatch(
        redeemCouponFailed({
          errorMessage: e?.response?.data?.errors || "Something went wrong",
        })
      );
    }
  };
};