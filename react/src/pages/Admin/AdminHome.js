import { Outlet, Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import ProductManagement from './ManageProducts';

export default function AdminHome() {
    return (
        <div className='admin-homepage'>
            <Navbar links = {navElements}/>
            <ProductManagement />
        </div>
    )
}

const navElements = [
    { title: 'User Management', path: '/user-management' },
    { title: 'Order Management', path: '/order-management' },
    { title: 'Sales Report', path: '/sales-report' },
    { title: 'Profile', path: '/profile' },
]