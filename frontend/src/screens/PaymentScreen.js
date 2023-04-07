import React, { useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import Meta from '../components/Meta'


const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if(!shippingAddress) {
        navigate('/login/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/place-order')
    }


  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Meta title='Payment' />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check 
                    type='radio' 
                    label='Paypal or Credit Card' 
                    id='PayPal' 
                    name='paymentMethod' 
                    value='PayPal' 
                    checked 
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </Form.Check>

                <Form.Check 
                    type='radio' 
                    label='Stripe' 
                    id='Stripe' 
                    name='paymentMethod' 
                    value='Stripe' 
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </Form.Check>
            </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen