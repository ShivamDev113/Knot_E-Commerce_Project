import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// 🔹 Create Context so it can be used globally in app
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // 🔹 Common constants
    const currency = '₹';
    const delivery_fee = 10;
    const backendURL= import.meta.env.VITE_BACKEND_URL

    // 🔹 States for search functionality
    const [search, setsearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);
    const [products, setproducts] = useState([])
    const [token, setToken] = useState('')
    // 🔹 Cart state (nested object format)
    // Structure example:
    // cart = {
    //   "p1": { "M": 2, "L": 1 },
    //   "p2": { "S": 3 }
    // }
    const [cart, setcart] = useState({});

    // 🔹 React Router hook for navigation
    const navigate = useNavigate();

    // 🛒 Add item to cart according to selected size
    const addToCart = async (itemId, size) => {

        // Agar size select nahi kiya, error show karo
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        // Copy of current cart (React state ko directly mutate nahi karte)
        let cartData = structuredClone(cart);

        // Agar item pehle se cart me hai
        if (cartData[itemId]) {
            // Agar same size already hai, quantity +1 karo
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            // Agar size first time add ho raha hai
            else {
                cartData[itemId][size] = 1;
            }
        } 
        // Agar product first time add ho raha hai
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Update cart state
        setcart(cartData);

        if(token) {
        try {
            
            await axios.post(backendURL + '/api/cart/add' , {itemId,size} , {headers:{token}})
            

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        }
    };

    //  Get total count of items (used in cart icon/badge)
    const getCartCount = () => {
        let totalCount = 0;
        // Loop through all product IDs
        for (const productId in cart) {
            // Loop through each size under that product
            for (const size in cart[productId]) {
                // Count only items with quantity > 0
                if (cart[productId][size] > 0) {
                    totalCount += cart[productId][size];
                }
            }
        }
        return totalCount;
    };


    // 🔄 Update quantity of specific product & size
    // Used for quantity input field and delete (bin icon → set quantity 0)
    const updateQuantity = async (itemId, size, quantity) => {
        let cartItems = structuredClone(cart);
        cartItems[itemId][size] = quantity;
        setcart(cartItems);

        if(token){

        try {
            
            await axios.post(backendURL + '/api/cart/update' , {itemId , size , quantity} , {headers : {token}})

        } catch (error) {
            console.log(error);
            toast.error(error,message);
            
        }

        }

    };

    // 💰 Calculate total amount of all items in cart
const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cart) {
        const itemInfo = products.find((p) => p._id === productId);

        // ⚠️ if product not loaded yet or removed from products list
        if (!itemInfo) continue; 

        for (const size in cart[productId]) {
            if (cart[productId][size] > 0) {
                totalAmount += itemInfo.price * cart[productId][size];
            }
        }
    }

    return totalAmount;
};


    const getProductsData= async()=>{
        try {
            const response=await axios.get(backendURL + '/api/product/list')
            if(response.data.success){
                setproducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getUserCart=async (token)=>{
        try {
            
            const response= await axios.post(backendURL + '/api/cart/get', {} , {headers:{token}})
            if(response.data.success){
                setcart(response.data.cartData)
            }

        } catch (error) {

            console.log(error);
            toast.error(error.message)            
        }
    }

    useEffect(() => {
      getProductsData()
    }, [])
    

    useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
        setToken(savedToken)
        getUserCart(savedToken)
    }
}, [])

    // 🔹 All values that will be shared across app components
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setsearch,
        showSearch,
        setshowSearch,
        addToCart,
        cart,
        setcart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendURL,
        token,
        setToken,
    };

    // 🔹 Wrap the whole app inside ShopContext.Provider
    // so every component can access these values using useContext()
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
