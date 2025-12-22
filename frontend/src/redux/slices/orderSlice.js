import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import orderAPI from "../../mocks/order";

// const initialState = {
//     listorder : [],
//     orderDetails: {},
//     loading: false,
//     error: null
// }

const initialState = {
  listorder: [],
  orderDetails: { orderItems: [] },
  loading: false,
  error: null
};


const orderSlice =  createSlice({
    name: 'order',
    initialState,
    reducers:{
        getOrderDetailsStart(state){
            state.loading = true;
            state.error = null;
        },
        getOrderDetailsSuccess(state,action){
            state.orderDetails = action.payload;
            state.loading = false;
            state.error = null;
            console.log(action.payload); 
        },
        getOrderDetailsFailure(state , action){
            state.loading = false;
            state.error = action.payload;
        },
        createOrderStart(state){
            console.log(state)
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess(state, action){
            state.listorder.push(action.payload);
            state.orderDetails = action.payload;
            state.loading = false;
            state.error = null;
            console.log(state,action)
        },
        createOrderFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        }
        ,
        payOrderStart(state){
            state.loading = true;
            state.error = null;
        },
        payOrderSuccess(state,action){
            if (action.payload === 'Order was paid'){
                state.orderDetails.isPaid = true; // update the 'ispaid' property of 'orderdetails'
            }
            state.loading = false;
            state.error = null;
            console.log(action.payload);
            console.log(state.orderDetails);

            return state; // return the updated state

        },
        payOrderFailure(state,action){
            state.loading = false;
            state.error = action.payload;

        },
        listMyOrdersStart(state){
            state.loading = true;
            state.error = null;
        },
        listMyOrdersSuccess(state , action){
            state.listorder = action.payload;
            state.loading = false;
            state.error = null;
        },
        listMyOrdersFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deliverOrderStart(state){
            state.loading = true;
            state.error = null;
        },
        deliverOrderSuccess(state,action){
            const updateOrder = action.payload;
            const index = state.listorder.findIndex((order) => order._id === updateOrder._id);
            if(index !== -1){
               state.listorder[index] = updateOrder;    
            }

            state.loading = false;
            state.error = null;
        },
        deliverOrderFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        },
    },

});

export const{
        getOrderDetailsStart,
        getOrderDetailsSuccess,
        getOrderDetailsFailure,
        createOrderStart,
        createOrderSuccess,
        createOrderFailure,
        payOrderStart,
        payOrderSuccess,
        payOrderFailure,
        listMyOrdersStart,
        listMyOrdersSuccess,
        listMyOrdersFailure,
        deliverOrderStart,
        deliverOrderSuccess,
        deliverOrderFailure,
} = orderSlice.actions;

export const createOrder = createAsyncThunk(
  "order/create",
  async (order, { rejectWithValue }) => {
    try {
      const data = await orderAPI.createOrder(order);
      return data;   // ✅ must return full order object
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// export const createOrder = (order) => async (dispatch) => {
//     try {
//         dispatch(createOrderStart());
//         const createOrder = await orderAPI.createOrder(order);
//         dispatch(createOrderSuccess());
//         localStorage.removeItem("cartItems");        
//     } catch (error){
//         dispatch(createOrderFailure(error.message));
//     }
// }

export const getOrderDetails = (orderId) => async (dispatch) => {
    try{
        dispatch(getOrderDetailsStart());
        const orderDetails = await orderAPI.getOrderDetails(orderId);
        console.log(orderId)
        dispatch(getOrderDetailsSuccess(orderDetails));
    } catch (error){
        dispatch(getOrderDetailsFailure(error.message));
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
    try{
        dispatch(payOrderStart());
        const updateOrder = await orderAPI.payOrder(orderId,paymentResult);
        dispatch(payOrderSuccess(updateOrder));
    } catch (error){
        dispatch(payOrderFailure(error.message));
    }
};

export const listMyOrders = () => async (dispatch) => {
    try {
        dispatch(listMyOrdersStart());
        const myOrders = await orderAPI.listMyOrders();
        dispatch(listMyOrdersSuccess(myOrders));
    } catch (error) {
        dispatch(listMyOrdersFailure(error.message));
    }
};

export const deliverOrder = (orderId) => async (dispatch) => {
    try {
        dispatch(deliverOrderStart());
        const updateOrder = await orderAPI.deliverOrder(orderId);
        dispatch(deliverOrderSuccess(updateOrder));
    } catch (error){
        dispatch(deliverOrderFailure(error.message))
    }
};

export const { reducer } = orderSlice;
export default orderSlice;