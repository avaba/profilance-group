import React from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {useActions} from '../../../hooks/useActions';
import './LoginForm.scss'

type FormData = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();

const LoginForm = () => {
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const {login} = useActions()

    const {register, handleSubmit, formState: {isValid}} = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            email: "sergey@mail.ru",
            password: "1234qwer"
        }
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        login(data.email, data.password)
    };

    return (
        <div className="login">
            <h3 className="login__title">Вход</h3>

            <p><strong>Админ</strong><br/>
                email: sergey@mail.ru <br/>
                пароль: 1234qwer</p>

            <p><strong>Пользователь</strong><br/>
                email: artem@mail.ru <br/>
                пароль: 1234qwer</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register('email')}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    {...register('password')}
                />
                <button
                    className="btn btn-full"
                    type="submit"
                    disabled={isLoading || !isValid}
                >
                    Войти
                </button>

                {error && <p className="login__error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;