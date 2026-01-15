import axios from "axios";

class OrderAPI{
    createOrder = async (order) => {
        try{
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`,
                }
            }
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders/add/`, order, config);
            return data;
        } catch (error){
            throw error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message;
        }
    }

    getOrderDetails = async (id) => {
        try{
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers:{
                    "Content-type": "application/json",
                    Authorization : `Bearer ${token}`,
                },
            }
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${id}/`,config)
            return data; 
        } catch (error){
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message ;
        }
    }

    payOrder = async (id,paymentResult) => {
        try{
            const token = JSON.parse(localStorage.getItem("userInfo")).token;
            const config = {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`,
                },
            }

            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/orders/${id}/pay/`,
                paymentResult,
                config,
            );
            return data;
        } catch(error){
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        }
    }

    listMyOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`,
                },
            }

            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/myorders/`, config);
            return data
        } catch (error){
             throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        }
    }


    deliverOrder = async (order) => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`,
                },
            }

            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${order.id}/deliver/`,{},config)
            return data;
        } catch (error){
             throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        }
    }

}

const orderAPI = new OrderAPI()
export default orderAPI;
