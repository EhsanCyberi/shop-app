"use client"
import { createContext, useState } from "react";

export const CartContex = createContext({
  cart: [],
  totalPrice: () => 0,
  addNumber: () => {},
  addToCart: () => {},
  lessNumber: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
});
export function CartProvider({children}) {
    const [cart, setCart] = useState([])

    function addToCart(product) {
        setCart( prev => {
            let selectedProduct = prev.find( (item)=> item._id == product._id )
            
            if (selectedProduct) {
                return prev.map(item => 
                    item._id == product._id ?
                    {...item, number: item.number+1}:
                    item 
                )
            } else {
                return [...prev, {...product, number: 1}]
            }
        })
    }

    function removeFromCart(id) {
        setCart( prev =>
            prev.filter( (item) => item._id != id )
        )
    }


    function addNumber(id) {
        setCart(prev => 
            prev.map(
                (item) => item._id == id ?
                {...item, number: item.number + 1} :
                item
            )
        )
    }

    function lessNumber(id) {
        setCart( prev => 
            prev.map ( 
                (item) => item._id == id ?
                {...item, number: Math.max(0,item.number - 1)} :
                item
            ).filter( (item) => item.number > 0 )
        )
    }

    function totalPrice() {
        let price = 0
        cart.forEach(item => {
            price += item.number * item.price
        });

        return price
    }

    function clearCart() {
        setCart([])
    }


    return (
        <CartContex.Provider value={{cart, totalPrice, addNumber, CartProvider, addToCart, lessNumber, removeFromCart, clearCart}}>
            {children}
        </CartContex.Provider>
    )
}