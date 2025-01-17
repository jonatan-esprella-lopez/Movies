import { useForm, SubmitHandler } from 'react-hook-form';

import type { SingleMovieDetails } from '@/interfaces/single-movie-details';

import "./checkout.css";


interface FormData {
  name: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface CheckoutProps {
  movie: SingleMovieDetails;
  time: string;
  seats: string[];
}

// function Checkout({ movie, time, seats }: CheckoutProps) {
// const Checkout: React.FC<CheckoutProps> = ({ movie, time, seats }) => {
const Checkout: React.FC<CheckoutProps> = ({ }) => {
 
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data:', data);
    alert('Booking successful! Check your email for tickets.');
  };

  const totalPrice = movie.price * seats.length;

  return (
    <div className="checkout-grid">
      <div className="checkout-card">
        <h2 className="text-2xl font-bold mb-6">Datos para pagar</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
          <div className="form-group grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"> 
            <div>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="form-input"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && <p className="error-text">{errors.name.message}</p>}
            </div>

            <div>
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="form-input"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Correo no válido"
                  }
                })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="form-label">Celular</label>
            <input
              type="tel"
              placeholder="Ingresa tu número"
              className="form-input"
              {...register("phone", { required: "El número de teléfono es obligatorio" })}
            />
            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
          </div>

          <div className="form-group grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="form-label">Número de tarjeta</label>
              <input
                type="text"
                maxLength={16}
                placeholder="Ingresa número de tarjeta"
                className="form-input"
                {...register("cardNumber", {
                  required: "El número de tarjeta es obligatorio",
                  minLength: { value: 16, message: "Debe tener 16 dígitos" },
                  maxLength: { value: 16, message: "Debe tener 16 dígitos" }
                })}
              />
              {errors.cardNumber && <p className="error-text">{errors.cardNumber.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Fecha de expiración</label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  className="form-input"
                  {...register("expiry", { required: "La fecha de expiración es obligatoria" })}
                />
                {errors.expiry && <p className="error-text">{errors.expiry.message}</p>}
              </div>

              <div>
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  maxLength={3}
                  placeholder="Ingresa tu código CVV"
                  className="form-input"
                  {...register("cvv", {
                    required: "El CVV es obligatorio",
                    minLength: { value: 3, message: "Debe tener 3 dígitos" },
                    maxLength: { value: 3, message: "Debe tener 3 dígitos" }
                  })}
                />
                {errors.cvv && <p className="error-text">{errors.cvv.message}</p>}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Completar pago
          </button>
        </form> 
      </div>
    </div>
  );
}

export default Checkout;
