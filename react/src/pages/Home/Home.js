import React, { useState } from 'react';
import NavigationBar from './Components/NavigationBar';
import ItemCard from './Components/ItemCard';
import Cart from './Components/Cart';
import Order from './Components/Order';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Products');
  const [cartItems, setCartItems] = useState([]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredItems = selectedCategory === 'Products'
    ? items
    : [];
  
  return (
    <div id="root">
      <NavigationBar data={menus} onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      <div className='body'>
        {selectedCategory === 'Products' && (
          <div className='cardsHolder'>
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                url={item.url}
                name={item.name}
                price={item.price}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ))}
          </div>
        )}
        {selectedCategory === 'Cart' && (
          <Cart data={cartItems} setCartItems={setCartItems} />
        )}
        {selectedCategory === 'Order' && (
          <Order data={cartItems} setCartItems={setCartItems} />
        )}
      </div>
    </div>
  );
}

// Navbar elements
const menus = [
  { name: "Products", url: "#", id: 1},
  { name: "Cart", url: "#", id: 2},
  { name: "Order", url: "#", id: 3},
];
//array of objects
const items = [
  { 
    id: "1",
    name: "Blender",          
    url: "https://www.electrolux.com.ph/globalassets/appliances/blenders-juicers/e3tb1-611s/e3tb1-611s-angl-1500x1500.png",   
    category: "Products",
    price: 99.99
  },
  { 
    id: "2",
    name: "Microwave Oven",   
    url: "https://images.samsung.com/is/image/samsung/p6pim/ph/mg30t5018cc-tc/gallery/ph-mw5000t-mg30t5018cc-tc-530524580?$650_519_PNG$",   
    category: "Products",
    price: 299.99
  },
  { 
    id: "3",
    name: "Washing Machine",  
    url: "https://www.lg.com/ph/images/washing-machines/md07556668/gallery1/D-2.jpg",   
    category: "Products",
    price: 499.99
  },
  { 
    id: "4",
    name: "Air Conditioner",  
    url: "https://shop.union.ph/cdn/shop/products/UGAIR-12000-RC_1200x1200.jpg?v=1688622343",   
    category: "Products",
    price: 799.99
  },
  { 
    id: "5",
    name: "Refrigerator",     
    url: "https://www.lg.com/ph/images/refrigerators/md05882016/gallery/GR-H432HLHN-iso-right.jpg",   
    category: "Products",
    price: 1299.99
  },
  { 
    id: "6",
    name: "Tomato",           
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1200px-Tomato_je.jpg",   
    category: "Products",
    price: 0.99
  },
  { 
    id: "7",
    name: "Banana",           
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_w0dD69DBHmo0xFwWtjgGnXoiiSbs-70kY5AwJLA7A&s",   
    category: "Products",
    price: 1.99
  },
  { 
    id: "8",
    name: "Lettuce",          
    url: "https://media.newyorker.com/photos/5b6b08d3a676470b4ea9b91f/4:3/w_1920,h_1440,c_limit/Rosner-Lettuce.jpg",   
    category: "Products",
    price: 2.49
  },
  { 
    id: "9",
    name: "Bread",            
    url: "https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/16:9/w_4000,h_2250,c_limit/milk-bread.jpg",   
    category: "Products",
    price: 3.99
  },
  { 
    id: "10",
    name: "Cheese",           
    url: "https://www.allrecipes.com/thmb/iRcip7RaCHF_RmbzDV4bC8gqNYs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-504780334-2000-1caaee9e697c40a8935db7b8d9818a85.jpg",  
    category: "Products",
    price: 5.99
  },
  { 
    id: "11",
    name: "Smartphone",       
    url: "https://www.1stmegasaver.com.ph/wp-content/uploads/2023/10/Oppo-A58-6GB128GB-6-72-inch-Smartphone-2.jpg",  
    category: "Products",
    price: 699.99
  },
  { 
    id: "12",
    name: "Laptop",           
    url: "https://cdn.ttgtmedia.com/rms/onlineimages/hp_elitebook_mobile.jpg",  
    category: "Products",
    price: 999.99
  },
  { 
    id: "13",
    name: "Headphones",       
    url: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363",  
    category: "Products",
    price: 199.99
  },
  { 
    id: "14",
    name: "Drone",            
    url: "https://braamdstore.com/wp-content/uploads/2023/07/DJI-Mavic-Enterprise-Series-M3E-2.jpg",  
    category: "Products",
    price: 899.99
  },
  { 
    id: "15",
    name: "Fitness Tracker",  
    url: "https://img.lazcdn.com/g/p/689fe897428cb84258bb62158845a85f.jpg_720x720q80.jpg",  
    category: "Products",
    price: 149.99
  },
  { 
    id: "16",
    name: "T-Shirt",          
    url: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fdd%2Fcf%2Fddcfe4e1b1313da86b059e70a1422ec4927aece3.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmobilemain%5D",  
    category: "Products",
    price: 19.99
  },
  { 
    id: "17",
    name: "Jeans",            
    url: "https://marksandspencer.com.ph/cdn/shop/products/SD_01_T57_7272_HD_X_EC_90.jpg?v=1679039562",  
    category: "Products",
    price: 39.99
  },
  { 
    id: "18",
    name: "Dress",            
    url: "https://dynamic.zacdn.com/EWzSICy_cOtBkhHyyvH35jCr05c=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/trendyol-7541-0987303-1.jpg",  
    category: "Products",
    price: 49.99
  },
  { 
    id: "19",
    name: "Sneakers",         
    url: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/387386/03/sv01/fnd/PHL/fmt/png/All-Day-Active-Sneakers-Youth",  
    category: "Products",
    price: 59.99
  },
  { 
    id: "20",
    name: "Hat",              
    url: "https://www.craftclothing.ph/cdn/shop/products/CP12-RF_1024x1024.jpg?v=1634795475",  
    category: "Products",
    price: 9.99
  }
];