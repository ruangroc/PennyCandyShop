/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import CartItem from './CartItem';

import { useDispatch, useSelector } from 'react-redux';
import { cartRemove, inventoryIncrement } from '../redux/actions';
import { getCart, getInventory } from '../redux/selectors';

// react bootstrap components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Cart(props) {
    const styles = css`
        #empty-cart {
            height: 200px;
            padding: 10%;
        }

        #header {
            margin-top: 2%;
            margin-bottom: 2%;
            padding: 1%;
        }

        #footer {
            margin-top: 2%;
            margin-bottom: 2%;
            padding: 1%;
        }

        #body {
            margin: 1%;
            padding: 1%;
        }
    `;

    var cartItems = useSelector(getCart);
    var products = useSelector(getInventory);
    var [cartTotal, setCartTotal] = useState(0);
    var [formattedCartItems, setFormattedCartItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        var total = 0;
        for (var i in cartItems) {
            total += cartItems[i] * products[i].price;
        }
        setCartTotal(total);
        setFormattedCartItems(formatCartItems());
    }, [cartItems]);

    
    function formatCartItems() {
        var items = [];
        for (var i in cartItems) {
            items.push(<CartItem key={i} item={products[i]} amount={cartItems[i]} remove={removeItem} />);
        }
        return items;
    }

    function checkout() {
        for (var i in cartItems) {
            const removeItems = cartRemove(i);
            dispatch(removeItems);
        }
    }

    function removeItem(item) {
        if (item && item.id) {
            const returnToInventory = inventoryIncrement(item, cartItems[item.id]);
            dispatch(returnToInventory);

            const removeItem = cartRemove(item.id);
            dispatch(removeItem);
        }
    }

    return (
        <Col className="sidebar" css={styles}>
            <Row id="header">
                <Col xs={8}>
                    <h3>Your Cart</h3>
                </Col>
                <Col xs={4}>
                    <Button onClick={props.onHide} variant="outline-secondary">Close</Button>
                </Col>
            </Row>
            <Row id="body">
                {Object.keys(cartItems).length > 0 ? <Col>{formattedCartItems}</Col> : <Col><div id="empty-cart">There is nothing in your cart</div></Col>}
            </Row>
            <Row id="footer">
                <Col xs={7}>
                    <h5>Your total: ${cartTotal}</h5>
                </Col>
                <Col xs={5}>
                    <Button onClick={() => checkout()} variant="info">Checkout</Button>
                </Col>
            </Row>
        </Col>
    );
}