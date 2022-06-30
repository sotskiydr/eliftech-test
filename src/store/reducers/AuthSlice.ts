import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ReduxService} from "../../services/ReduxService";
// import { PURGE } from "redux-persist"; // для удаления токена


type AuthState = {
    userName: string | null
    token: string | null
    isCurrentUser: boolean;
}

const initialState:AuthState = {
    userName: '',
    token: '',
    isCurrentUser: true
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
          ReduxService.endpoints.createUser.matchFulfilled,
          (state, { payload }) => {
              state.token = payload.token
              state.isCurrentUser = true
          })
          .addMatcher(
            ReduxService.endpoints.loginUser.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token
                state.isCurrentUser = true
          })
          .addMatcher(
           ReduxService.endpoints.logout.matchRejected,
           (state, { payload }) => {
               state.token = ''
           })
    },
})


export default authSlice.reducer
