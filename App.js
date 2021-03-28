import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import cartReducer from "./store/reducers/cart"
import orderReducer from "./store/reducers/order"
import ReduxThunk from "redux-thunk"
import authReducer from "./store/reducers/auth"
import NavigationContainer from "./navigation/NavigationContainer"

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "galyon-regular": require("./assets/fonts/Galyon-Regular.otf"),
    "galyon-bold": require("./assets/fonts/Galyon-Bold.otf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
