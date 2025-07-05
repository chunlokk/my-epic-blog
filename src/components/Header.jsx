import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/blogs">Blogs</Link>
            </nav>
        </header>
    )
}
