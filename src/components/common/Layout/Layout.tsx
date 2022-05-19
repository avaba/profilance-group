import React from 'react';
import Header from "../Header/Header";

interface ILayout {
    children: React.ReactNode;
}

const Layout = (props: ILayout) => {
    return (
        <>
            <Header/>
            <div className="container">
                {props.children}
            </div>
        </>
    );
};

export default Layout;