import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "@/redux/features/authSlice";
import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user details when component mounts
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    // Redirect to login page or perform additional logout actions
    navigate("/signin");
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <>
          <h2>Welcome, {user.first_name}</h2>
          <p>Email: {user.email}</p>
        </>
      )}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default UserDashboard;
