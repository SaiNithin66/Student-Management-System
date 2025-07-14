import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content">
          <h1 className="home-title">🎓 Student Management System</h1>
          <p className="home-description">
            Easily manage student profiles, track semester-wise grades, and compute averages with ease.
          </p>
          <div className="home-buttons">
            <button className="btn login" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn signup" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
``
