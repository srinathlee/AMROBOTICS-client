import React, { useState, useEffect } from 'react';
import { getCartDetails,deleteCart } from '../../helper';
import { MdDeleteOutline } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { LuMinusCircle } from "react-icons/lu";
import {ThreeDots} from 'react-loader-spinner'
import emptycart from '../assets/emptycart.png'
import { useNavigate } from 'react-router-dom';
import {updateCart,deleteAllCart} from '../../helper'

import axios from 'axios'
import "./cart.css"

// cart item component ________________________________________
const CartItem=(props)=>{
  const {handleDelete,each,updateCartQuantity}=props
  const{name,images,quantity,price,id}=each
  return(

      <div className='bg-white rounded-md p-3 flex flex-row' >
    <div className='flex flex-row '  >
      <div className='w-[20%] mr-2 flex  items-center'><img className='w-full rounded-md mr-6' src={images[0]} />
</div>
<div className='flex flex-col justify-center w-[75%]'>
<h1 className='text-[clamp(0.8rem,2vw,1rem)] font-bold'>{name}</h1>
<p className='text-[clamp(0.8rem,2vw,1rem)] font-bold'>₹ {price}</p>
   <div className='flex gap-5 items-center w-[30%] justify-center'>
       <button className='w-[10%]' onClick={()=>{updateCartQuantity({id,operation:"inc"})}}>
       <FiPlusCircle className="text-2xl"/>
       </button>
       <p className='text-xl w-[10%] ml-3'>{quantity}</p>
       <button  className='w-[10%]'  onClick={()=>{updateCartQuantity({id,operation:"dec"})}}>
         <LuMinusCircle className="text-2xl"/>
       </button>
     </div>


</div>
    </div>
    <div className='w-[10%] justify-center flex items-center  cursor-pointer'>
    <MdDeleteOutline  onClick={()=>handleDelete(id)} className=' deleteall-icon text-2xl ' id='redd' />
    </div>

  </div>
  )
}

const Cart = () => {
  const [CartDetails, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartAmount,setCartAmount]=useState(0)
  const navigate=useNavigate()

  useEffect(() => {
    getDetails();
  }, []);


// getting cart details________________________________________
  const getDetails = async () => {
    const response = await getCartDetails();
    if (response.status == 200){
      setDetails(response.data.data);
      const money= response.data.data.reduce((accumulator, currentValue) => accumulator + (currentValue.price*currentValue.quantity), 0)
      setCartAmount(money);
      setLoading(false);
    }
  };


// delete cart item______________________________________________
  const handleDelete = async(id) => {
    const response = await deleteCart(id)
    // const newDetails=CartDetails.filter((each)=>each.id!=id)
    // // const newDetails=id.map((item)=>details.filter((each)=>each.id!=item))
    // setDetails(newDetails)
    await getDetails()  
 };


//  delete all cart items_______________________________________
const deleteMycart=async()=>{
  const response = await deleteAllCart()
  if(response.status==200)
  setDetails([])

}

// increment the quantity of the cart item_______________________
const updateCartQuantity = async(a) => {
    const response=await updateCart(a)
    if(response.status==200)
    getDetails()
};

 
  const loadingView = () => {
  
      return (
        <div className='w-full h-full flex flex-row justify-center items-center'>
        <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#ff9f1c"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
        </div>
      )
  }

  const emptyCartView=()=>{
    return(
      <div className='flex flex-col items-center'>
        <img  src={emptycart}/>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl font-bold'>Your Cart is Empty</h1>
          <p className='text-md w-50'>Looks like you have not  added any anything to the cart Go ahead & Explore top Categories</p>
        </div>
      </div>
    )
  }

  const successView=()=>{
   return(
      <div className='px-10 py-5 flex flex-col h-[80vh]'>
       <div className='flex flex-row justify-between '>
       <h1 className='text-black font-black text-xl'>Cart Details</h1>
      {
           CartDetails.length<=0?<></>: <button onClick={deleteMycart}  className='flex flex-row items-center gap-1 bg-[#434142] px-2 py-1.5 rounded-md'> <MdDeleteOutline className=' deleteall-icon text-2xl' /><span className=' text-white text-[clamp(0.7rem,2vh,1rem)]'>Delete All</span> </button>
      }
      
      
       </div>

       {/* cart items part */}
      <div className='cart-items-container mt-4 flex flex-col gap-5 h-[60vh] overflow-scroll'>
        {
          // console.log(details.lenght)
          CartDetails.length<=0? emptyCartView():CartDetails.map((each)=><CartItem each={each} key={each.id} handleDelete={handleDelete} updateCartQuantity={updateCartQuantity}/>)
          
        }

      </div>

      {/* chackout part */}
     {
      CartDetails.length<=0?<></>: <div className='self-end mt-auto'>
      <h1 className='font-bold text-xl'>{`Sub Total : ₹ ${ CartDetails.reduce((accumulator, currentValue) => accumulator + (currentValue.price*currentValue.quantity), 0)}/-`}</h1>
      {/* <button  onClick={()=>payButton(cartAmount)} className=' bg-[#ff9f1c] px-2 py-1.5 rounded-md  font-bold'>Check Out</button> */}
      <button onClick={()=>navigate("/checkout",{state:{CartDetails,cartAmount}})}  className=' bg-[#ff9f1c] px-2 py-1.5 rounded-md  font-bold'>Check Out</button>
      </div>

     }
    </div>
   )
  }
 
  if (loading) {
    return loadingView();
  } else {
    return successView();
  }
};

export default Cart;
