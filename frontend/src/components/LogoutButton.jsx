import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 🔓 Remove token
    navigate('/login'); // 🔁 Redirect to login
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
      Logout
    </button>
  );
}
