import React from "react";

interface IValidate {
    name: string;
    value: string;
    setErrors: ( value: IRegFormState ) => void;
    errors: IRegFormState;
}

interface IRegFormState {
    name: string;
    email: string;
    password: string;
}

export const validate = ({name, value, setErrors , errors}: IValidate) => {
    switch (name) {
        case 'name':
            setErrors({
                ...errors,
                name: value.length > 3 ? '' : 'This field must be better then 3 symbols'
            })
            break
        case 'email':
            setErrors({
                ...errors,
                email: (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value) ? '' : 'Email is not valid.',
            })
            break
        case 'password':
            setErrors({
                ...errors,
                password: value.length > 6 && value.length < 16 ? '' :
                  'Password must be better then 6 symbols, less then 16 symbols'
            })
            break
        default:
            return ''
    }
};
