import {Navigate, Outlet} from 'react-router-dom';
import {FC} from 'react';

const PrivateRoutes: FC<{ auth: boolean }> = ({auth}) => {
    return auth ? <Outlet/> : <Navigate to='/'/>;
};

export default PrivateRoutes;