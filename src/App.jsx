import {useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";



function App() { 

const initialCart = () => {
  const localsTorageCart = localStorage.getItem("cart")
  return localsTorageCart ? JSON.parse(localsTorageCart) : []
}


const [data] = useState(db)
const [cart, setCart] = useState (initialCart)

const MAX_ITEM=10

const MIN_ITEM= 1
  
useEffect ( () =>{
localStorage.setItem("cart", JSON.stringify(cart))

}, [cart] )

function addtoCart(item){
  const itemExists=cart.findIndex(guitar => guitar.id === item.id)
  if(itemExists >=0){//existe en el carrito 
    if (cart[itemExists].quantity >= MAX_ITEM ) return
  const updateCart=[...cart]
  updateCart[itemExists].quantity++
  setCart(updateCart)
  } else{
    item.quantity=1
    setCart([...cart, item])
  }
 
}

function removeFromCart(id) {
  setCart (prevCart => prevCart.filter(guitar => guitar.id !== id ))
}

function increasequantity (id){
const updateCart = cart.map( item =>  {
if(item.id === id &&item.quantity < MAX_ITEM   ) {

       return{
        ...item,
        quantity: item.quantity +1
       }
      
      }
     return item
      } )
      setCart(updateCart)
   }

   function descremenquantity (id){
    const updateCart = cart.map( item =>  {
    if(item.id === id &&item.quantity > MIN_ITEM )    {
    
           return{
            ...item,
            quantity: item.quantity -1
           }
          
          }
         return item
          } )
          setCart(updateCart)
       }
    

function clearCart (){
  setCart ([])
}




  return (
    <>  
 
 <Header  
 cart={cart}
 removeFromCart={removeFromCart}
 increasequantity={increasequantity}
 descremenquantity={descremenquantity}
 clearCart={clearCart}
 />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map ((guitar) => (
              <Guitar 
              key={guitar.id}
              guitar ={guitar}
              setCart ={setCart}
              addtoCart={addtoCart}
              />  
             
          ))}
        
      
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">Pérez-SofT - Todos los derechos Reservados</p>
        </div>
    </footer>


    </>
  )
}

export default App
