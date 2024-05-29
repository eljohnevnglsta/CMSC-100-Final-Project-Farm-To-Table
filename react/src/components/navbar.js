import rootlogo from '../images/logo.jpg';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    return (
        <nav className="root-nav">
            <div className='root-label'>
                <img
                    className="root-nav-logo"
                    src={rootlogo}
                    alt="Farm-To-Table Logo"
                />
                <div className="root-nav-name">Farm-To-Table</div>
            </div>
            <div className="root-nav-links">
                {props.links.map((link) => (
                    <Link to={link.path}>{link.title}</Link>
                ))}
            </div>
        </nav>
    );
}