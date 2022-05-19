import React from 'react';
import "./News.scss"
import {INews} from "../../types/newstList";
import NewsToolbar from "./NewsToolbar";
import {isAuth, userRole} from "../../api/network";

interface INewsCard {
    item: INews
}

const NewsCard = ({item}: INewsCard) => {
    return (
        <div className="news-card">
            <h3>{item.title}</h3>
            <p>{item.date}</p>
            <p>{item.description}</p>
            {(isAuth && userRole === "superAdmin") && <NewsToolbar item={item} />}
        </div>
    );
};

export default NewsCard;