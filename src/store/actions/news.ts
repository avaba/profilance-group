import {
    INews,
    NewsAction,
    NewsActionEnum,
    SetApproveNews, SetDeleteNews,
    SetErrorNews,
    SetIsLoadingNews,
    SetNewsAction,
} from "../../types/newstList";
import {Dispatch} from "react";
import network from "../../api/network";

export const setNews = (payload: Array<INews>): SetNewsAction => ({
    type: NewsActionEnum.SET_NEWS,
    payload
})

export const setIsLoadingNews = (payload: boolean): SetIsLoadingNews => ({
    type: NewsActionEnum.SET_IS_LOADING_NEWS,
    payload
})

export const setErrorNews = (payload: string): SetErrorNews => ({
    type: NewsActionEnum.SET_ERROR_NEWS,
    payload
})

export const setApproveNews = (id: string, approve: boolean): SetApproveNews => ({
    type: NewsActionEnum.SET_APPROVE_NEWS,
    payload: {id, approve}
})

export const setDeleteNews = (id: string): SetDeleteNews => ({
    type: NewsActionEnum.SET_DELETE_NEWS,
    payload: id
})

export const fetchNews = () => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            dispatch(setIsLoadingNews(true));
            const response = await network.get(`/news`)
            const data = response.data
            if (data.length) {
                dispatch(setNews(data))
            }
            dispatch(setIsLoadingNews(false))
        } catch (e) {
            dispatch(setErrorNews('Произошла ошибка'))
        }
    }
}

export const approveNews = (item: INews) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            const response = await network.put(`/news/${item.id}`, {...item, approve: !item.approve})
            if (response.statusText === "OK") {
                dispatch(setApproveNews(item.id, !item.approve))
            }
        } catch (e) {
            dispatch(setErrorNews('Произошла ошибка'))
        }
    }
}

export const deleteNews = (id: string) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            const response = await network.delete(`/news/${id}`)
            if (response.statusText === "OK") {
                dispatch(setDeleteNews(id))
            }
        } catch (e) {
            dispatch(setErrorNews('Произошла ошибка'))
        }
    }
}