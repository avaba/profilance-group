import React from 'react';
import {INews} from "../../types/newstList";
import {useActions} from "../../hooks/useActions";

export interface INewsToolbar {
    item: INews
}

const NewsToolbar = ({item}: INewsToolbar) => {
    const {approveNews, deleteNews} = useActions()

    const handleApprove = () => {
        approveNews(item)
    }

    const handleDelete = () => {
        deleteNews(item.id)
    }

    return (
        <div className="news-toolbar">
            <button onClick={() => handleApprove()}>{item.approve ? "Отклонить" : "Опубликовать"}</button>
            <button onClick={() => handleDelete()}>Удалить</button>
        </div>
    );
};

export default NewsToolbar;