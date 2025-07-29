import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QUOTES = [
  "Learning never exhausts the mind. – Leonardo da Vinci",
  "The beautiful thing about learning is that nobody can take it away from you. – B.B. King",
  "An investment in knowledge pays the best interest. – Benjamin Franklin",
  "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. – Malcolm X",
  "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt"
];

const RazorpayPayment = () => {
  const location = useLocation();
  const nav = useNavigate();
  const Amount = location.state?.amount;
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));

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
    const amountInPaise = Amount * 100;
    const options = {
      key: "rzp_live_s9aCg5zD74050t",
      amount: amountInPaise,
      currency: 'INR',
      name: 'Your Business Name',
      description: 'Payment for services',
      image: 'https://via.placeholder.com/128x128/667eea/ffffff?text=LOGO',
      handler: function (response) {
        const userId = localStorage.getItem("userId");
        const eventId = location.state?.eventId || '';
        fetch('http://localhost:5000/api/event-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            eventId,
            amount: Amount,
            transactionId: response.razorpay_payment_id,
            paymentStatus: "Paid"
          })
        })
        .then(res => res.json())
        .then(() => {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          nav("/dash");
          setIsLoading(false);
        })
        .catch(() => {
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
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 to-purple-200">
      {/* Left Panel: Quotes */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="max-w-md text-center">
          <svg className="mx-auto mb-6" width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 00-4-4H3V7a4 4 0 014-4h2a4 4 0 014 4v2a4 4 0 01-4 4H7v2a4 4 0 004 4h2a4 4 0 004-4v-2a4 4 0 00-4-4h-2V7a4 4 0 014-4h2a4 4 0 014 4v2a4 4 0 01-4 4h-2v2a4 4 0 004 4h2a4 4 0 004-4v-2a4 4 0 00-4-4h-2" /></svg>
          <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Inspiration for You</h2>
          <blockquote className="italic text-xl opacity-90 mb-4">“{QUOTES[quoteIdx]}”</blockquote>
          <button
            className="mt-2 px-4 py-2 bg-white/20 border border-white/40 rounded-lg text-white font-semibold hover:bg-white/30 transition"
            onClick={() => setQuoteIdx((prev) => (prev + 1) % QUOTES.length)}
          >
            Next Quote
          </button>
        </div>
      </div>
      {/* Right Panel: Payment */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 min-h-screen">
        <div className="relative flex flex-col items-center justify-center min-h-[520px] w-full max-w-xl">
          {/* Glassmorphism Card */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-96 w-3 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 rounded-full shadow-lg"></div>
          <div className="relative z-10 w-full bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl px-12 py-14 flex flex-col items-center border border-white/40">
            {/* Floating Icon */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-4 shadow-lg border-4 border-white/40">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
            </div>
            <div className="h-10" />
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 tracking-wide text-center">Secure Payment Portal</h2>
            {/* Amount in a circular badge */}
            <div className="flex flex-col items-center mb-8">
              <span className="text-lg text-gray-700 mb-2">Amount to Pay</span>
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg border-4 border-white/60">
                <span className="text-3xl font-extrabold text-white">₹{Amount}</span>
              </div>
            </div>
            {/* Progress bar (static for now) */}
            <div className="w-full flex items-center mb-8">
              <div className="flex-1 h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full"></div>
              <span className="mx-4 text-sm text-gray-500">Step 2 of 2</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
            </div>
            {/* Payment Button */}
            <button
              onClick={initiatePayment}
              disabled={isNaN(Amount) || isLoading || !razorpayLoaded}
              className={`w-full py-4 rounded-2xl font-bold text-xl mt-2 transition shadow-lg border-2 ${isNaN(Amount) || isLoading || !razorpayLoaded ? 'bg-gray-300 text-gray-500 border-gray-200 cursor-not-allowed' : 'bg-white/20 border-gradient-to-r from-indigo-500 to-purple-500 text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:scale-105 hover:shadow-2xl'}`}
            >
              {isLoading ? 'Processing...' : !razorpayLoaded ? 'Loading Payment Gateway...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment;
