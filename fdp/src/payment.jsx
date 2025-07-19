import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RazorpayPayment = () => {
  const location = useLocation();
  const nav = useNavigate();
  const FIXED_AMOUNT = location.state?.amount || 149;

  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (!window.Razorpay) {
      loadRazorpayScript();
    } else {
      setRazorpayLoaded(true);
    }
  }, []);

  const initiatePayment = () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please try again in a moment.');
      return;
    }

    setIsLoading(true);

    const amountInPaise = FIXED_AMOUNT * 100;

    const options = {
      key: "rzp_live_s9aCg5zD74050t",
      amount: amountInPaise,
      currency: 'INR',
      name: 'Your Business Name',
      description: 'Payment for services',
      image: 'https://via.placeholder.com/128x128/667eea/ffffff?text=LOGO',
      handler: function (response) {
        // Get userId and eventId from localStorage or navigation state
        const userId = localStorage.getItem("userId");
        const eventId = location.state?.eventId || '';

        // Send payment details to backend
        fetch('http://localhost:5000/api/event-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            eventId,
            amount: FIXED_AMOUNT,
            transactionId: response.razorpay_payment_id,
            paymentStatus: "Paid"
          })
        })
        .then(res => res.json())
        .then(data => {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          nav("/dash");
          setIsLoading(false);
        })
        .catch(err => {
          alert('Payment was successful, but failed to store payment details.');
          setIsLoading(false);
        });
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      notes: {
        address: 'Payment for services'
      },
      theme: {
        color: '#667eea'
      },
      modal: {
        ondismiss: function() {
          nav("/dash");
          setIsLoading(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      alert('Payment failed: ' + response.error.description);
      setIsLoading(false);
    });

    rzp.open();
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Amount: ₹{FIXED_AMOUNT}</p>
      <button onClick={initiatePayment} disabled={isLoading || !razorpayLoaded}>
        {isLoading ? 'Processing...' : !razorpayLoaded ? 'Loading Payment Gateway...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default RazorpayPayment;
