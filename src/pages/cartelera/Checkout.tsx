import React, { useState } from 'react';
// import { Calendar, Clock, CreditCard, Mail, User, Phone } from 'lucide-react';
import type { Movie } from '../App';
import "./checkout.css"

interface CheckoutProps {
  movie: Movie;
  time: string;
  seats: string[];
}

function Checkout({ movie, time, seats }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Booking successful! Check your email for tickets.');
  };

  return (
    <div className="checkout-grid">
      {/* <div className="checkout-card">
        <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
        
        <div className="booking-details">
          <div className="flex items-start gap-3">
            
            <div>
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <div className="flex items-center gap-2 movie-meta">
                <span>Today</span>
              </div>
              <div className="flex items-center gap-2 movie-meta">
                <span>{time}</span>
              </div>
            </div>
          </div>

          <div className="selected-seats">
            <h4 className="font-bold mb-2">Selected Seats</h4>
            <div className="flex flex-wrap gap-2">
              {seats.map((seat) => (
                <span key={seat} className="seat-tag">
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className="price-summary">
            <div className="flex justify-between mb-2">
              <span className="text-meta">Tickets ({seats.length}x)</span>
              <span>${(movie.price * seats.length).toFixed(2)}</span>
            </div>
            <div className="flex justify-between total-price">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div> */}

<div className="checkout-card">
  <h2 className="text-2xl font-bold mb-6">Datos para pagar</h2>

  <form onSubmit={handleSubmit} className="payment-form">
    <div className="form-group grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div>
        <label className="form-label">Nombre</label>
        <div className="relative">
          <input
            type="text"
            required
            className="form-input"
            placeholder='Ingresa tu nombre'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Correo electronico</label>
        <div className="relative">
          <input
            type="email"
            required
            placeholder='Ingresa tu correo electrónico'
            className="form-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
    </div>

    <div>
    <div>
        <label className="form-label">Celular</label>
        <div className="relative">
          <input
            type="tel"
            required
            placeholder='Ingresa tu número'
            className="form-input"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>
    </div>

    <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="form-label">Numero de tarjeta</label>
        <div className="relative">
          <input
            type="text"
            required
            placeholder='Ingresa número de tarjeta'
            maxLength={16}
            className="form-input"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Fecha de expiración</label>
          <input
            type="text"
            required
            maxLength={5}
            placeholder="MM/YY"
            className="form-input"
            value={formData.expiry}
            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
          />
        </div>
        <div>
          <label className="form-label">CVV</label>
          <input
            type="text"
            required
            placeholder='Ingresa tu codigo CVV'
            maxLength={3}
            className="form-input"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
          />
        </div>
      </div>
    </div>

    {/* <button type="submit" className="btn btn-primary btn-full">
      Completar pago 
    </button> */}
  </form>
</div>

    </div>
  );
}

export default Checkout;
