import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);

    const fetchData = async () => {
        await axios.get('http://localhost:4000/product/get')
            .then((res) => {
                if (res.data.status === 200) {
                    setAllProducts(res.data.results)
                }
            })

        if (localStorage.getItem('auth-token')) {
            axios.get('http://localhost:4000/cart/get', {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setCartItems(res.data.results)
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const formatPrice = (price) => {
        let priceString = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return priceString.replace(/\s/g, '');
    }

    const normalizeString = (string) => {
        return string.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                          .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
                          .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                          .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
                          .replace(/[ìíịỉĩ]/g, 'i')
                          .replace(/[ÌÍỊỈĨ]/g, 'I')
                          .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                          .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O')
                          .replace(/[ùúụủũưừứựửữ]/g, 'u')
                          .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
                          .replace(/[ỳýỵỷỹ]/g, 'y')
                          .replace(/[ỲÝỴỶỸ]/g, 'Y')
                          .replace(/[đ]/g, 'd')
                          .replace(/[Đ]/g, 'D')
                          .replace(/\s/g, '')
                          .toLowerCase();
    }
    
    const addToCart = (id, name, image, newPrice, oldPrice) => {
        let found = false;
        let index = 0;
        let newCartItems = [...cartItems]
        cartItems.forEach((product, i) => {
            if (product && product.id === id) {
                found = true;
                index = i;
            }
        })
        if (found) {
            newCartItems[index].quantity += 1;
            if (isProductInOrder({id: id})) {
                let quantity = newCartItems[index].quantity;
                addToOrder({id, quantity});
            }
        }
        else {
            newCartItems = [
                ...newCartItems,
                {
                    id: id,
                    name: name,
                    image: image,
                    newPrice: newPrice,
                    oldPrice: oldPrice,
                    quantity: 1
                }
            ]
        }
        setCartItems(newCartItems)

        if (localStorage.getItem('auth-token')) {
            axios.post('http://localhost:4000/cart/add', {
                    "productId": id,
            }, {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    
    const removeFromCart = (id) => {
        let found = false;
        let index = 0;
        let newCartItems = [...cartItems]
        cartItems.forEach((product, i) => {
            if (product && product.id === id) {
                found = true;
                index = i;
            }
        })
        if (found) {
            if (newCartItems[index].quantity > 0) {
                newCartItems[index].quantity -= 1;
                if (isProductInOrder({id})) {
                    let quantity = newCartItems[index].quantity;
                    addToOrder({id, quantity});
                }
            }
            if (newCartItems[index].quantity === 0) {
                removeFromOrder({id});
                newCartItems.splice(index, 1);
            }
        }
        setCartItems(newCartItems);

        if (localStorage.getItem('auth-token')) {
            axios.patch('http://localhost:4000/cart/remove', {
                "productId": id
            }, {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    const deleteFromCart = async (id) => {
        let found = false;
        let index = 0;
        let newCartItems = [...cartItems]
        cartItems.forEach((product, i) => {
            if (product && product.id === id) {
                found = true;
                index = i;
            }
        })
        if (found) {
            removeFromOrder({id});
            newCartItems.splice(index, 1);
        }
        setCartItems(newCartItems);

        if (localStorage.getItem('auth-token')) {
            await axios.patch('http://localhost:4000/cart/delete', {
                "productId": id
            }, {
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    
    const getTotalItems = () => {
        let totalItems = 0;
        cartItems.forEach((product) => {
            totalItems += Number(product.quantity);
        })
        return totalItems;
    }

    const addToOrder = (product) => {
        if (product instanceof Array) {
            setOrderProducts([...product]);
        } else {
            const foundProduct = isProductInOrder(product);
            if (foundProduct) {
                foundProduct.quantity = product.quantity;
            } else {
                setOrderProducts(prev => [...prev, product]);
            }
        }
    }

    const removeFromOrder = (product) => {
        if (product instanceof Array) {
            setOrderProducts([]);
        } else {
            const index = orderProducts.findIndex(item => item.productId === product.productId && item.color === product.color)
            if (index !== -1) {
                setOrderProducts(prev => {
                    prev.splice(index, 1);
                    return [...prev];
                });
            }
        }
    }

    const isProductInOrder = (product) => {
        return orderProducts.find(item => item.id === product.id);
    }

    const getTotalCost = () => {
        let totalCost = 0;
        orderProducts.forEach((product) => {
            totalCost += product.newPrice * product.quantity
        })
        return totalCost;
    }
    
    const contextValue = {
        allProducts, cartItems, orderProducts, formatPrice, normalizeString,
        addToCart, removeFromCart, deleteFromCart, getTotalItems, 
        addToOrder, removeFromOrder, isProductInOrder, getTotalCost
    };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;