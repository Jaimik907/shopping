import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';

interface IUserSlice {
  user: IUser[];
  isLoading: boolean;
}

const initialState: IUserSlice = {
  user: [],
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
    },
    getUserFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getUserRequest, getUserSuccess, getUserFailed } =
  userSlice.actions;

export default userSlice.reducer;
