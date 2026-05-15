const userModel = require('../models/userModel')

/*
-------------------------------------------------------
ADD TO CART
-------------------------------------------------------
This function:
1. Receives product info from frontend (userId, itemId, size)
2. Finds the user in database
3. Updates cartData:
   - If product + size already exists → increase quantity
   - Else → add product/size with quantity = 1
4. Saves updated cart back to database
*/
const addToCart = async (req, res) => {

  try {
    // Data coming from frontend (Add to Cart button)
    const { userId, itemId, size } = req.body

    // Fetch user from database using userId
    const userData = await userModel.findById(userId)

    // Get existing cart data of the user
    // cartData is an object stored inside user document
    let cartData = userData.cartData

    /*
      cartData structure looks like:
      {
        productId1: { M: 2, L: 1 },
        productId2: { S: 1 }
      }
    */

    // Check if product already exists in cart
    if (cartData[itemId]) {

      // Check if selected size already exists for that product
      if (cartData[itemId][size]) {
        // If yes, increase quantity by 1
        cartData[itemId][size] += 1
      } else {
        // Size does not exist → add size with quantity 1
        cartData[itemId][size] = 1
      }

    } else {
      // Product does not exist in cart → create product entry
      cartData[itemId] = {}

      // Add selected size with quantity 1
      cartData[itemId][size] = 1
    }

    // Save updated cart data back to database
    await userModel.findByIdAndUpdate(userId, { cartData })

    // Send success response to frontend
    res.json({ success: true, message: "Added To Cart" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error adding to cart" })
  }
}

/*
-------------------------------------------------------
UPDATE CART
-------------------------------------------------------
This function:
1. Receives itemId, size, and new quantity from frontend
2. Finds user cart
3. Directly updates quantity of selected product & size
4. Saves updated cart
*/
const updateCart = async (req, res) => {

  try {
    // Data sent when user clicks + / - buttons in cart page
    const { userId, itemId, size, quantity } = req.body

    // Fetch user from database
    const userData = await userModel.findById(userId)

    // Get existing cart
    let cartData = userData.cartData

    // Update quantity for specific product and size
    cartData[itemId][size] = quantity

    // Save updated cart to database
    await userModel.findByIdAndUpdate(userId, { cartData })

    // Send success response
    res.json({ success: true, message: "Cart Updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Cart Update Failed" })
  }
}

/*
-------------------------------------------------------
GET USER CART
-------------------------------------------------------
This function:
1. Receives userId
2. Fetches user cart data from database
3. Sends cart data to frontend (for cart page display)
*/
const getUserCart = async (req, res) => {

  try {
    // userId sent from frontend (or ideally from JWT middleware)
    const { userId } = req.body

    // Fetch user data
    const userData = await userModel.findById(userId)

    // Extract cart data
    let cartData = userData.cartData

    // Send cart data to frontend
    res.json({ success: true, cartData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Failed to fetch cart data" })
  }
}

// Export all cart controllers
module.exports = { addToCart, updateCart, getUserCart }
