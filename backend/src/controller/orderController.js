// Placing Order using COD Method===>>>>
const orderModels = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require('stripe')

// Global variables--->

const currency='Inr'
const deliveryCharges=10

// Initializing GateWay--->

    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder=async(req,res)=>{
    
    try {
        
        const {userId , items, amount,address} = req.body;
        
        const orderData={
            userId,
            items,
            amount,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
        }
        
        const newOrder= new orderModels(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        
        res.json({success:true, message:"Order Placed"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}    

// Placing Order using Stripe Method===>>>>

const placeOrderStripe=async(req,res)=>{
    
    try {
        const {userId , items, amount,address} = req.body;
        const {origin} = req.headers;
        
        const orderData={
            userId,
            items,
            amount,
            address,
            amount,
            paymentMethod:'Stripe',
            payment:false,
            date: Date.now()
    
        }
        
        const newOrder= new orderModels(orderData)
        await newOrder.save()

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity
        }))
        line_items.push({

            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharges * 100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({success:true, session_url:session.url});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Verify Stripe--->
const verifyStripe=async(req,res)=>{

    const {orderId, success , userId}=req.body
    try {
        if(success==="true"){
            await orderModels.findByIdAndUpdate(orderId , {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true})
        }
        else{
            await orderModels.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}

// Placing Order using RazorPay Method===>>>>

const placeOrderRazorpay=async(req,res)=>{

}

// All Orders Data for admin planel--->

const allOrders= async(req,res)=>{

    try {
    
    const orders = await orderModels.find({})

    res.json({success:true , orders})

    } catch (error) {
    res.json({success:false , message:error.message})    
    }


}

// update order status---->
const userOrders= async(req, res)=>{
    
    try {
        
        const {userId} = req.body

        const orders=await orderModels.find({userId})

        res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:fale, message:error.message})
        
    }

}

// update order status from admin---->

const updateStatus=async(req,res)=>{

    try {
        
        const {orderId , status} = req.body

        await orderModels.findByIdAndUpdate(orderId , {status})
        res.json({success:true , message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:error.message})
    }

}

module.exports={placeOrder , placeOrderStripe , placeOrderRazorpay , allOrders , userOrders , updateStatus , verifyStripe}