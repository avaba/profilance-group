import React from 'react';
import NewsList from "../components/NewsList/NewsList";
import {Link} from "react-router-dom";

const News = () => {
    return (
        <>
            <div className="title-page">
                <h1>Новости</h1>
                <Link className="btn" to="/add-news">Добавить новость</Link>
            </div>

            <NewsList/>
        </>
    );
};

export default News;