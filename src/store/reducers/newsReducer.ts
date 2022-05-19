import {NewsAction, NewsActionEnum, NewsState} from "../../types/newstList";


const initialState: NewsState = {
    list: [],
    isLoading: false,
    error: '',
}

export const newsReducer = (state = initialState, action: NewsAction): NewsState => {
    switch (action.type) {
        case NewsActionEnum.SET_NEWS:
            return {...state, list: action.payload, error: '', isLoading: false}
        case NewsActionEnum.SET_ERROR_NEWS:
            return {...state, list: [...initialState.list], error: action.payload, isLoading: false}
        case NewsActionEnum.SET_IS_LOADING_NEWS:
            return {...state, isLoading: action.payload}
        case NewsActionEnum.SET_APPROVE_NEWS:
            return {
                ...state,
                list: [...state.list.map(item => {
                    if (item.id === action.payload.id) {
                        item.approve = action.payload.approve
                    }
                    return item
                })]
            }
        case NewsActionEnum.SET_DELETE_NEWS:
            return {
                ...state,
                list: [...state.list.filter(item => item.id !== action.payload)]
            }
        default:
            return state;
    }
}