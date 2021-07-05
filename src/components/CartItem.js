/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

// react bootstrap components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function CartItem(props) {
    const styles = css`
        .item-card {
            width: 100%;
            padding: 2%;
        }
    `;

    return (
        <Row css={styles}>
            <Card className="item-card">
                <Row>
                    <Col xs={7} id="left" align="center">
                        <Card.Title> {props.item.name} </Card.Title>
                        <Button size="sm" variant="outline-danger" onClick={() => props.remove(props.item)}> Remove item </Button>
                    </Col>
                    <Col xs={5} id="right">
                        <Row><Card.Text> ${props.item.price} each </Card.Text></Row>
                        <Row><Card.Text> In cart: {props.amount} </Card.Text></Row>
                        <Row><Card.Text> Item total: ${(props.amount) * (props.item.price)} </Card.Text></Row>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
}