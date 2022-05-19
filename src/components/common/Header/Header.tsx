import React, {useState} from 'react';
import logo from '../../../assets/img/logo.svg'
import './HeaderStyle.scss'
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
import LoginForm from "../../form/LoginForm/LoginForm";
import {isAuth} from "../../../api/network";
import {useActions} from "../../../hooks/useActions";

const Header = () => {
    const {logOut} = useActions()
    const [login, setLogin] = useState(false)

    return (
        <div className="header">
            <div className="container">
                <div className="header__wrap">
                    <Link to="/" className="header__logo">
                        <img src={logo} alt="logo"/>
                    </Link>

                    <ul className="header__menu">
                        <li><Link to="/news">Новости</Link></li>
                    </ul>

                    {isAuth ? (
                        <button className="btn" onClick={() => logOut()}>Выход</button>
                    ) : (
                        <button className="btn" onClick={() => setLogin(true)}>Вход</button>
                    )}

                </div>
            </div>

            {login && (
                <Modal active={login} setActive={setLogin}>
                    <LoginForm/>
                </Modal>
            )}

        </div>
    );
};

export default Header;