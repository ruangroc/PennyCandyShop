/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

// react bootstrap components
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function Product(props) {
    const styles = css`
        .card-image {
            width: 175px;
            height: 175px;
            margin-bottom: 10px;
        }
    `;

    return (
        <Card css={styles} className="product-card" align="center">
            <Card.Body>
                <Card.Img variant="top" src={props.item.photoUrl} className="card-image" />
                <Card.Title> {props.item.name} </Card.Title>
                {
                    props.item.inStock === 0 ? 
                    <Card.Text> ${props.item.price} each --- Out of stock </Card.Text> : 
                    <Card.Text> ${props.item.price} each --- {props.item.inStock} in stock </Card.Text>
                }
                <InputGroup size="sm">
                    <FormControl value={props.purchaseAmount} onChange={(e) => {props.updateAmount(e, props.item.id)}}/>
                    <InputGroup.Append>
                    <Button 
                        disabled={props.item.inStock === 0 ? true : false}
                        variant="outline-secondary" 
                        onClick={() => {props.addToCart(props.item)}}
                    >
                        Add to Cart
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Card.Body>
        </Card>
    );
}
