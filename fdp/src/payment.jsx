import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';
const RazorpayPayment = () => {
  // ===== RAZORPAY CONFIGURATION =====
  const nav = useNavigate();
  const RAZORPAY_KEY_ID = "rzp_live_s9aCg5zD74050t";  // Replace with your Razorpay Key ID
  const RAZORPAY_SECRET = "mvdj0PSTUrcK4KpgynH1oxV8";       // Replace with your Razorpay Secret Key
  
  // ===== PAYMENT CONFIGURATION =====
  const FIXED_AMOUNT = 149; // Amount in INR (change this to your desired amount)

  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
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

  const initiatePayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please try again in a moment.');
      return;
    }

    setIsLoading(true);

    // Convert amount to paise (Razorpay expects amount in paise)
    const amountInPaise = FIXED_AMOUNT * 100;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      name: 'Your Business Name',
      description: 'Payment for services',
      image: 'https://via.placeholder.com/128x128/667eea/ffffff?text=LOGO', // Replace with your logo
      handler: function (response) {
        // Payment successful
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
         nav("/dash");
        
        // You can send this data to your server for verification
        // verifyPayment(response);
        
        setIsLoading(false);
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
          // Payment cancelled
           nav("/dash");
          setIsLoading(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      alert('Payment failed: ' + response.error.description);
      console.log('Payment failed:', response.error);
      setIsLoading(false);
    });

    rzp.open();
  };

  // Optional: Function to verify payment on your server
  const verifyPayment = async (paymentResponse) => {
    try {
      const response = await fetch('/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Payment verified successfully');
      } else {
        console.log('Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-md text-center transform transition-all duration-500 hover:scale-105">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Secure Payment</h1>
          <p className="text-gray-600">Quick and secure payment processing</p>
        </div>

        {/* Amount Section */}
        <div className="bg-indigo-50 rounded-2xl p-6 mb-8 border-2 border-indigo-100">
          <div className="text-sm text-gray-600 mb-3 uppercase tracking-wider">Payment Amount</div>
          <div className="flex items-center justify-center text-4xl font-bold text-gray-800">
            <span className="text-2xl text-gray-600 mr-1">₹</span>
            {FIXED_AMOUNT}
          </div>
          <div className="mt-3 text-sm text-gray-600">Service Fee</div>
        </div>

        {/* Pay Button */}
        <button
          onClick={initiatePayment}
          disabled={isLoading || !razorpayLoaded}
          className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg ${
            isLoading || !razorpayLoaded
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1'
          }`}
        >
          <div className="flex items-center justify-center">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing...
              </>
            ) : !razorpayLoaded ? (
              'Loading Payment Gateway...'
            ) : (
              'Pay Now'
            )}
          </div>
        </button>

        {/* Security Info */}
        <div className="mt-6">
          <p className="text-xs text-gray-600 mb-4">
            🔒 Your payment is secured with 256-bit SSL encryption
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">SSL Secured</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">PCI Compliant</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">Bank Grade Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment;