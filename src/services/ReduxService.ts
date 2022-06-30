import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IMakeCartOrder, ISignIn, ISignUp, ISignUpRes} from "../store/models/Interfaces";
import {RootState} from "../store/store";


export const ReduxService = createApi({
    reducerPath: 'AppAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://eliftech-test-back.herokuapp.com`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).AuthSlice.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['PostApp'],
    endpoints: build => ({
        createUser: build.mutation<ISignUpRes, ISignUp>({
            query: (user) => ({
                url: `/api/auth/registration`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['PostApp']
        }),
        loginUser: build.mutation<ISignUpRes, ISignIn>({
            query: (user) => ({
                url: `/api/auth/login`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['PostApp']
        }),
        logout: build.mutation<null, string>({
            query: () => ({
                url: `/api/auth/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['PostApp']
        }),
        getCurrentUser: build.query<any, string>({
            query: () => ({
                url: `/api/auth/current`
            }),
            providesTags: result => ['PostApp']
        }),
        getShops: build.query<any, string>({
            query: () => ({
                url: `/api/products/get-shops`
            }),
            providesTags: result => ['PostApp']
        }),
        makeOrder: build.mutation<IMakeCartOrder, IMakeCartOrder>({
            query: (order) => ({
                url: `/api/products/make-order`,
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['PostApp']
        }),
    })
})

export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
    useGetShopsQuery,
    useMakeOrderMutation
} = ReduxService