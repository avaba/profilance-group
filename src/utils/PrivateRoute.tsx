import {Navigate} from "react-router-dom";
import {isAuth} from "../api/network";

type PrivateRouteProps = {
    outlet: JSX.Element;
};

export default function PrivateRoute({outlet}: PrivateRouteProps) {
    return (isAuth) ? (
        <>
            {outlet}
        </>
    ) : (
        <Navigate to={{pathname: '/'}}/>
    );
};