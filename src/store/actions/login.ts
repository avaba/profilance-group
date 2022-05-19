import {Dispatch} from 'react'
import {AuthAction, AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction} from '../../types/login'
import network from "../../api/network";

export const setIsAuth = (payload: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH, payload
})
export const setIsLoading = (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING_AUTH, payload
})
export const setError = (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR_AUTH, payload
})

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch(setIsLoading(true));
            const response = await network.get(`/users?email=${email}`)
            const data = response.data

            if (data.length > 0) {
                if (data[0].password === password) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('role', data[0].role)
                    localStorage.setItem('name', data[0].name)
                    dispatch(setIsAuth(true))
                    window.location.reload()
                } else {
                    dispatch(setError('Не правильный email или пароль'))
                }
            }

            if (data.length === 0) {
                dispatch(setError('Пользователь с таким email не найден'))
            }

            dispatch(setIsLoading(false));
        } catch (e) {
            dispatch(setError('Произошла ошибка'))
        }
    }
}

export const logOut = () => {
    return (dispatch: Dispatch<AuthAction>) => {
        window.location.reload()
        localStorage.removeItem('auth')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        dispatch(setIsAuth(false))
    }
}
