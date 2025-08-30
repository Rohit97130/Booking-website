import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button, message } from 'antd';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      border: '1px solid #d9d9d9',
      padding: '10px',
      borderRadius: '6px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false,
};

const CheckoutForm = ({ amount, onPaymentSuccess, selectedSeats, show }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'Customer', // You can get this from user data
        email: 'customer@example.com', // You can get this from user data
      },
    });

    if (error) {
      console.error('Error creating payment method:', error);
      message.error(error.message);
      setIsLoading(false);
      return;
    }

    console.log('PaymentMethod created:', paymentMethod);

    // Here you would normally send the paymentMethod.id to your server
    // For now, we'll simulate a successful payment
    try {
      // Simulate API call to your backend
      const paymentData = {
        paymentMethodId: paymentMethod.id,
        amount: amount,
        currency: 'usd',
        selectedSeats: selectedSeats,
        showId: show._id,
        // Add any other booking details needed
      };

      console.log('Payment data to send to server:', paymentData);
      
      // Call your payment success handler
      onPaymentSuccess(paymentData);
      
      message.success('Payment successful!');
    } catch (err) {
      console.error('Payment failed:', err);
      message.error('Payment failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      {/* Test card info */}
      <div style={{ 
        marginBottom: '16px', 
        padding: '12px', 
        backgroundColor: '#e6f7ff', 
        border: '1px solid #91d5ff',
        borderRadius: '6px',
        fontSize: '12px'
      }}>
        <strong>Test Card Numbers:</strong><br />
        💳 4242 4242 4242 4242 (Visa)<br />
        💳 4000 0566 5566 5556 (Visa Debit)<br />
        📅 Use any future date, CVC: any 3 digits
      </div>

      <div style={{ 
        padding: '16px', 
        border: '1px solid #d9d9d9', 
        borderRadius: '6px', 
        marginBottom: '16px',
        backgroundColor: '#fafafa'
      }}>
        <CardElement options={cardElementOptions} />
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <span><strong>Total Amount: ${(amount / 100).toFixed(2)}</strong></span>
        <span>Seats: {selectedSeats.join(', ')}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={isLoading}
          disabled={!stripe}
          size="large"
          shape="round"
          style={{ width: '200px' }}
        >
          {isLoading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
