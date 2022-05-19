import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import "./News.scss"
import NewsCard from "./NewsCard";
import {isAuth} from "../../api/network";
import {Link} from "react-router-dom";

const NewsList = () => {
    const {isLoading, error, list} = useTypedSelector(state => state.news)
    const {fetchNews} = useActions()
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState("approve")

    useEffect(() => {
        fetchNews()
    }, [])

    const handleTab = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const tabName = e.currentTarget.value
        setActiveTab(tabName)
    }

    const filterContact = useMemo(() => {
        return list.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [list, searchQuery])

    const renderList = () => {
        let news = [...filterContact]

        if (activeTab === "approve") {
            news = filterContact.filter(item => item.approve)
        }

        if (activeTab === "reject") {
            news = filterContact.filter(item => !item.approve)
        }

        return (
            <>
                <div className="news__filter">
                    <input
                        type="text"
                        placeholder="Поиск по заголовку"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {isAuth && (
                    <div className="news-tabs">
                        <button
                            className={`news-tabs__item ${(activeTab === "approve") && "news-tabs__item--active"}`}
                            value="approve"
                            onClick={(e) => handleTab(e)}
                        >
                            Одобренные
                        </button>
                        <button
                            className={`news-tabs__item ${(activeTab === "reject") && "news-tabs__item--active"}`}
                            value="reject"
                            onClick={(e) => handleTab(e)}
                        >
                            Неодобренные
                        </button>
                    </div>
                )}

                <div className="news__list">
                    {news.length ? news.map(item => <NewsCard key={item.id} item={item}/>) : "Ничего не найдено!"}
                </div>
            </>
        )
    }

    const loading = isLoading && "Загрузка..."
    const content = !isLoading && renderList()
    const errorMessage = (!isLoading && !!error) && "При загрузке произошла ошибка"

    return (
        <div className="news">
            {loading}
            {content}
            {errorMessage}
        </div>
    );
}

export default NewsList;