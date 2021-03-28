import { ADD_TO_CART } from "./cart";
import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.id;
      const response = await fetch(
        `https://rn-shop-app-94127-default-rtdb.firebaseio.com/orders/${userId}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const respData = await response.json();
      const loadedOrders = [];
      for (const key in respData) {
        loadedOrders.push(
          new Order(
            key,
            respData[key].cartItems,
            respData[key].totalAmount,
            new Date(respData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.id
    const date = new Date();
    const response = await fetch(
      `https://rn-shop-app-94127-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const respData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: respData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
