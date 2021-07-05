/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import useProducts from './hooks/useProducts';
import Cart from './components/Cart';
import Product from './components/Product';

// react bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';
import { getCart, getInventory } from './redux/selectors';
import { inventoryAdd, inventoryDecrement, cartAdd } from './redux/actions';

import 'bootstrap/dist/css/bootstrap.min.css';  

function App() {
  const styles = css`
    .product-card {
      width: 260px;
      margin: 10px;
    }

    .shopping-cart {
      position: absolute;
      right: 3%;
    }

    .page-title {
      margin: 10px;
    }

    .sidebar {
      background-color: aliceblue;
      width; 100%;
    }

    #sidebar-col {
      padding: 0px;
    }
  `;

  var [showCart, setShowCart] = useState(false);
  var [purchaseAmounts, setPurchaseAmounts] = useState({});
  var loadProducts = useProducts();
  var inventory = useSelector(getInventory);
  var cartItems = useSelector(getCart);
  const dispatch = useDispatch();

  useEffect(() => {
    // once data is loaded, add products to redux store before displaying them
    if (loadProducts.isLoading === false) {
      var amounts = {}
      loadProducts.products.forEach(item => {
        const addProduct = inventoryAdd(item);
        dispatch(addProduct);
        amounts[item.id] = 0;
      });
      setPurchaseAmounts(amounts);
    }
  }, [loadProducts.isLoading]);

  function addToCart(item) {
    // check to make sure purchase amount does not exceed stock
    var inStock = inventory[item.id].inStock;
    if (purchaseAmounts[item.id] > inStock) {
      alert("You cannot buy more than the quantity available!");
    }
    else {
      const addItemToCart = cartAdd(item, purchaseAmounts[item.id]);
      dispatch(addItemToCart);
  
      const decInventory = inventoryDecrement(item, purchaseAmounts[item.id]);
      dispatch(decInventory);
  
      setPurchaseAmounts({...purchaseAmounts, [item.id]: 0});
      // how to update e.target.value of the input form from here though?
    }
  }

  function updateAmount(e, productId) {
    var newValue = Number(e.target.value);
    if (newValue > 0) {
      setPurchaseAmounts({...purchaseAmounts, [productId]: newValue});
    }
  }

  function formatInventory() {
    var cards = [];
    for (var i in inventory) {
      cards.push(
        <Product 
          item={inventory[i]} 
          updateAmount={updateAmount} 
          addToCart={addToCart} 
          key={inventory[i].id}
          purchaseAmount={purchaseAmounts[inventory[i].id]}
        />
      );
    }
    return cards;
  }

  return (
    <div css={styles}>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Penny Candy Store</Navbar.Brand>
        <Button onClick={() => setShowCart(!showCart)} variant="info" className="shopping-cart">Your Cart ({Object.keys(cartItems).length})</Button>
      </Navbar>
      <Container fluid>
        <Row>
          <Col xs={showCart ? 9 : 12}>
            <Row>
              <h1 className="page-title">Inventory</h1>
            </Row>
            {loadProducts.isLoading ? (<Row>Loading...</Row>) : (<Row>{formatInventory()}</Row>)}
          </Col>
          <Col xs={showCart ? 3 : 0} id="sidebar-col">
            {showCart && <Cart onHide={() => setShowCart(false)} />}
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
