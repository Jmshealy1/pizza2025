import {Outlet, Link} from "react-router-dom";
import './css/Navigation.css';


function Navigation() {
    return (
        <nav id="main-nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blog">Blog</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;