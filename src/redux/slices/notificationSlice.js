import {createSlice} from '@reduxjs/toolkit';
import {ApiService} from '../../api';
import {Toast, useToast} from 'native-base';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
      Notifications: [],
      isLoading: false,
      isError: false,
      errorMessage: '',
    },
    reducers: {
        getNotificationRequested: (state, action) => {
          state.isLoading = true;
          state.errorMessage = '';
          state.isError = false;
        },
        getNotificationSuccessful: (state, action) => {
          state.isLoading = false;
          state.Notifications = action.payload.Notifications;
        },
        getNotificationFailed: (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload.errorMessage;
          state.isError = true;
        },
    }
});

export const {
    getNotificationRequested,
    getNotificationSuccessful,
    getNotificationFailed,
}= notificationSlice.actions;

export default notificationSlice.reducer;

export const getNotification = () => {
    return async (dispatch, getState) => {
      dispatch(getNotificationRequested());
      const {token} = getState().loginSlice;
      try {
        const payload = {
          token,
        };
        const res = await ApiService.getNotification(payload);
        if (res.data.success) {
          dispatch(
            getNotificationSuccessful({
              Notifications: res.data
            }),
          );
        } else {
          dispatch(
            getNotificationFailed({
              errorMessage: e?.response?.data?.errors || 'Something went wrong',
            }),
          );
        }
      } catch (e) {
        dispatch(
            getNotificationFailed({
            errorMessage: e?.response?.data?.errors || 'Something went wrong',
          }),
        );
      }
    };
  };