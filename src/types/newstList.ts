export interface INews {
    id: string;
    title: string;
    description: string;
    date: string;
    approve: boolean
}

export interface NewsState {
    list: Array<INews>,
    isLoading: boolean;
    error: string;
}

export enum NewsActionEnum {
    SET_NEWS = "SET_NEWS",
    SET_ERROR_NEWS = "SET_ERROR_NEWS",
    SET_IS_LOADING_NEWS = "SET_IS_LOADING_NEWS",
    SET_APPROVE_NEWS = "SET_APPROVE_NEWS",
    SET_DELETE_NEWS = "SET_DELETE_NEWS",
}

export interface SetNewsAction {
    type: NewsActionEnum.SET_NEWS;
    payload: Array<INews>;
}

export interface SetErrorNews {
    type: NewsActionEnum.SET_ERROR_NEWS;
    payload: string;
}

export interface SetIsLoadingNews {
    type: NewsActionEnum.SET_IS_LOADING_NEWS;
    payload: boolean;
}

export interface SetApproveNews {
    type: NewsActionEnum.SET_APPROVE_NEWS;
    payload: {id: string, approve: boolean}
}

export interface SetDeleteNews {
    type: NewsActionEnum.SET_DELETE_NEWS;
    payload: string
}

export type NewsAction =
    SetNewsAction |
    SetErrorNews |
    SetIsLoadingNews |
    SetApproveNews |
    SetDeleteNews