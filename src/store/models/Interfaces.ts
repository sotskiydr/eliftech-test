export interface ISignUp {
    name: string;
    email: string;
    password: string;
}

export interface ISignIn {
    email: string;
    password: string;
}

export interface ISignUpRes {
    token: string;
}

export interface IShops {
    id: number;
    name: string,
    products: [];
    isActive: boolean;
}

export interface IProducts {
    id: number;
    name: string;
    image: string;
    price: number;
    amount?: number;
}

export interface ICart {
    amount: number;
    cart: IProducts[];
}

export interface ICartChange {
    num: number;
    currentAmount: number;
    action: string;
    product: IProducts
}

export interface IOrder {
    id: number;
    name: string;
    image: string;
    price: number;
    amount: number;
}

export interface IForm {
    name: string;
    email: string;
    address: string;
    phone: string;
}

export interface IMakeCartOrder {
    name: string;
    email: string;
    address: string;
    phone: string;
    cart: ICart;
}

export interface IGetCartOrder {
    _id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    cart: ICart;
}