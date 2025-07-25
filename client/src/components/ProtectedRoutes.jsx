import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace={false} // important for back button to work
      />
    );
  }
};

export default ProtectedRoutes;