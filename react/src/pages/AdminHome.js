import { Outlet, Link } from 'react-router-dom';

export default function AdminHome() {
    return (
        <>
            <p>Welcome back, admin</p>
            <nav>
                <ul>
                <li><Link to={`/users`}>Customers</Link></li>
                <li><Link to={`/Products`}>Product Management</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}