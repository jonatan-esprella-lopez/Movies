import { useForm } from 'react-hook-form';

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
  movie: { price: number };
  seats: any[];
}
export const Checkout = ({ movie, seats }: CheckoutProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    alert('Booking successful! Check your email for tickets.');
  };
  const totalPrice = movie.price * seats.length;

  return (
    <div className="checkout">
      <div className="checkout__card">
        <h2 className="checkout__title">Datos para pagar {totalPrice}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="checkout__form">
          <div className="checkout__group">
            <div className="checkout__field">
              <label className="checkout__label">Nombre</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="checkout__input"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && <p className="checkout__error">{errors.name.message}</p>}
            </div>

            <div className="checkout__field">
              <label className="checkout__label">Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="checkout__input"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Correo no válido"
                  }
                })}
              />
              {errors.email && <p className="checkout__error">{errors.email.message}</p>}
            </div>
          </div>

          <div className="checkout__field">
            <label className="checkout__label">Celular</label>
            <input
              type="tel"
              placeholder="Ingresa tu número"
              className="checkout__input"
              {...register("phone", { required: "El número de teléfono es obligatorio" })}
            />
            {errors.phone && <p className="checkout__error">{errors.phone.message}</p>}
          </div>

          <div className="checkout__card-details">
  <div className="checkout__card-field">
    <label className="checkout__label">Número de tarjeta</label>
    <input
      type="text"
      maxLength={16}
      placeholder="Ingresa número de tarjeta"
      className="checkout__input"
      {...register("cardNumber", {
        required: "El número de tarjeta es obligatorio",
        minLength: { value: 16, message: "Debe tener 16 dígitos" },
        maxLength: { value: 16, message: "Debe tener 16 dígitos" }
      })}
    />
    {errors.cardNumber && <p className="checkout__error">{errors.cardNumber.message}</p>}
  </div>

  <div className="checkout__card-field">
    <div className="checkout__card-subfields">
      <div>
        <label className="checkout__label">Fecha de expiración</label>
        <input
          type="text"
          maxLength={5}
          placeholder="MM/YY"
          className="checkout__input"
          {...register("expiry", { required: "La fecha de expiración es obligatoria" })}
        />
        {errors.expiry && <p className="checkout__error">{errors.expiry.message}</p>}
      </div>

      <div>
        <label className="checkout__label">CVV</label>
        <input
          type="text"
          maxLength={3}
          placeholder="CVV"
          className="checkout__input"
          {...register("cvv", {
            required: "El CVV es obligatorio",
            minLength: { value: 3, message: "Debe tener 3 dígitos" },
            maxLength: { value: 3, message: "Debe tener 3 dígitos" }
          })}
        />
        {errors.cvv && <p className="checkout__error">{errors.cvv.message}</p>}
      </div>
    </div>
  </div>
</div>


          <button type="submit" className="checkout__btn">
            Completar pago
          </button>
        </form>
      </div>
    </div>
  );
};
