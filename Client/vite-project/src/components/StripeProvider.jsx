import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51S0wF4Pa5OFiur38iMkAoEq2sNgkaGq1UXJJu0MFylIhAbBhtiBDi1AyEZ9AyWYRjDsXmpCrFuns3i6Bn4a0Xjjb00ZL70ww7g');

const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
