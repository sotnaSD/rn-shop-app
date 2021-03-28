import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from '../UI/Card'


const OrderItem = (props) => {
  const [showDetails, setshowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>$ {props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={ !showDetails ? "Show Details" : "Hide Details"}
        onPress={() => {
          setshowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
            key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "galyon-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "galyon-regular",
    color: "#888",
  },
  detailItems: {
      width: "100%"
  }
});
