import axios from "axios";
class CartAPI {
    async fetchProduct(productId){
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
            return data
        } catch (error){
            throw error
        }
    }
}

const cartAPI = new CartAPI();

export default cartAPI;