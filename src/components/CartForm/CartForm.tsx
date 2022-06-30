import React, {useState} from 'react';
import style from "../../pages/ShoppingPage/ShoppingPage.module.scss";
import {IForm} from "../../store/models/Interfaces";
import CartList from "../CartList";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {useMakeOrderMutation} from "../../services/ReduxService";
import {onChangeShop} from "../../store/reducers/ActionCreators";

const CartForm = () => {
    const dispatch = useAppDispatch()
    const [makeOrder, {}] = useMakeOrderMutation()
    const {cart} = useAppSelector(state => state.ShopsSlice)

    const [form, setForm] = useState<IForm>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = () => {
        const request = {...form,cart}
        makeOrder(request)
        dispatch(onChangeShop())
        setForm({
            name: '',
            email: '',
            phone: '',
            address: ''
        })
    }

    return (
      <>
          <div className={style['cart-container']}>
              <form className={style.form}>
                  <label className={style['form-label']} htmlFor="name">Name</label>
                  <input
                    className={style['form-input']}
                    onChange={handleChange}
                    id='name'
                    name='name'
                    type="text"
                    value={form.name}
                  />
                  <label className={style['form-label']} htmlFor="email">Email</label>
                  <input
                    className={style['form-input']}
                    onChange={handleChange}
                    id='email'
                    name='email'
                    type="text"
                    value={form.email}
                  />
                  <label className={style['form-label']} htmlFor="phone">Phone</label>
                  <input
                    className={style['form-input']}
                    onChange={handleChange}
                    id='phone'
                    name='phone'
                    type="text"
                    value={form.phone}
                  />
                  <label className={style['form-label']} htmlFor="address">Address</label>
                  <input
                    className={style['form-input']}
                    onChange={handleChange}
                    id='address'
                    name='address'
                    type="text"
                    value={form.address}
                  />
              </form>
              <div className={style.cart}>
                  <CartList />
              </div>
          </div>
          <div className={style['submit-box']}>
              <p className={style['submit-box_text']}>Total price: {cart.amount + '$'}</p>
              <button onClick={handleSubmit} className={style['submit-box_btn']}>Submit</button>
          </div>
      </>
    );
};

export default CartForm;
