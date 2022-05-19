import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import Home from "./pages/Home";
import News from './pages/News';
import AddNews from "./pages/AddNews";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/add-news" element={<PrivateRoute outlet={<AddNews/>}/>}/>
                </Routes>
            </Layout>
        </Router>

    );
}

export default App;
