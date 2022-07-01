import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReduxService} from "../../services/ReduxService";
// import { PURGE } from "redux-persist"; // для удаления токена


type AuthState = {
    userName: string | null
    token: string | null
    isCurrentUser: boolean;
    isLoading: boolean;
}

const initialState:AuthState = {
    userName: '',
    token: '',
    isCurrentUser: true,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        renderCurrentUser (state, action: PayloadAction<boolean>) {
            state.isCurrentUser = action.payload;
        },
        addUserName (state, action: PayloadAction<string>){
            state.userName = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(
            ReduxService.endpoints.createUser.matchPending,
            (state, { payload }) => {
                state.isLoading = true
            })
          .addMatcher(
          ReduxService.endpoints.createUser.matchFulfilled,
          (state, { payload }) => {
              state.token = payload.token
              state.isCurrentUser = true
              state.isLoading = false
          })
          .addMatcher(
            ReduxService.endpoints.loginUser.matchPending,
            (state, { payload }) => {
                state.isLoading = true
            })
          .addMatcher(
            ReduxService.endpoints.loginUser.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.isCurrentUser = true
                state.isLoading = false
          })
          .addMatcher(
            ReduxService.endpoints.logout.matchPending,
            (state, { payload }) => {
                state.isLoading = true
            })
          .addMatcher(
           ReduxService.endpoints.logout.matchRejected,
           (state, { payload }) => {

               state.token = ''
               state.isLoading = false
           })
    },
})


export default authSlice.reducer
