import { Navigate, useLocation } from 'react-router-dom';

export const DirectAccess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    return location.state && location.state.flowRedirectFrom ? (
        children
    ) : (
        <Navigate to='/auth' replace={true} />
    );
};
