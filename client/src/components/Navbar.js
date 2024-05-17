import { Outlet, Link } from 'react-router-dom';

export default function Root() {

    return (
        <>
            <nav>
                <ul>
                <li><Link to={`/`}>Home</Link></li>
                <li><Link to={`/users`}>Customers</Link></li>
                <li><Link to={`/Products`}>Product Management</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}