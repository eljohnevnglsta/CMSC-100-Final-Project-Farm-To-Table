import rootlogo from '../images/logo.jpg';

export default function Navbar(props) {
    return (
        <nav className="root-nav">
            <img
                className="root-nav-logo"
                src={rootlogo}
                alt="Farm-To-Table Logo"
            />
            <div className="root-nav-name">Farm-To-Table</div>
            <div className="root-nav-links">
                {props.links.map((link) => (
                    <a href={link.path}>{link.title}</a>
                ))}
            </div>
        </nav>
    );
}