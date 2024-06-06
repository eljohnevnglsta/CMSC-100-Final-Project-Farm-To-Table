import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getProductName = async (productId) => {
    const url = 'http://localhost:3001/get-product-by-id';
    try {
        const response = await axios.post(url, { productId: productId }, {withCredentials: true, credentials: 'include'});
        return {
            name: response.data.productName,
            image: response.data.productImage,
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            name: '',
            image: '',
        };
    }
}

function convertToPhilippineTime(utcDateString) {
    const options = {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };

    const date = new Date(utcDateString).toLocaleString('en-US', options);
    return date;
}

export default function StatusCard(props) {
    const { item } = props;
    const [productData, setProductData] = useState({ name: '', image: '' });

    useEffect(() => {
        const fetchProductData = async () => {
            const data = await getProductName(item.productId);
            setProductData(data);
        };

        fetchProductData();
    }, [item.productId]);

    return (
        <div className="status-card">
            <div className='status-card-img-text'>
                {(productData.image ? 
                    <img src={productData.image} alt={productData.name} className="status-card-image" />
                    :
                    <img src="https://t3.ftcdn.net/jpg/05/11/93/52/360_F_511935270_eWFvJ4B8YBOMZMlDbOecz6pLstVW5mbV.jpg" alt={productData.name} className="status-card-image" />
                )}
                
                <div className='status-details'>
                    <div className="status-card-name">
                        {productData.name ? productData.name : 'Deleted Product'}
                    </div>
                    <div className="status-card-quantity">
                        QTY: {item.orderQuantity}
                    </div>
                    <div className="status-card-date">
                        {convertToPhilippineTime(item.dateOrdered).toLocaleString()}
                    </div>
                </div>
            </div>
            <div>
                {props.isPending && props.button}
            </div>
        </div>
    );
}
