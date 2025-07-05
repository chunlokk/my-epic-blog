import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>The page you're looking for seems to have wandered off into the digital wilderness. Don't worry, it happens to the best of us!</p>
            <Link to="/">Take Me Home</Link>
        </div>
    )
}