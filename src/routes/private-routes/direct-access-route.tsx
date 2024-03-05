import { Navigate, useLocation } from 'react-router-dom';

import { ROUTE_PATHS } from '../../constants/route-paths/paths';

export const DirectAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    return location.state && location.state.flowRedirectFrom ? (
        children
    ) : (
        <Navigate to={ROUTE_PATHS.routes.auth} replace={true} />
    );
};
