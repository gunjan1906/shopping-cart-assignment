import { useDispatch, useSelector } from "react-redux";
import { CART_ACTION_TYPES } from "../../redux/actionTypes/cart";

const CartItem = (props) => {

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartData.cart);

  const manageQty = (type,id) => {

    const isDecrease = type === "decrease";
    const tempCart = [...cart];
    const index = tempCart.findIndex((item) => item.id === id);
    if (tempCart[index]["quantity"] <= tempCart[index]["stock"]) {
      tempCart[index]["quantity"] =
        tempCart[index]["quantity"] + (isDecrease ? -1 : 1);
    }

    if (tempCart[index]["quantity"] <= 0) {
      tempCart.splice(index, 1);
    }
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_QUANTITY,
      payload: tempCart,
    });
  };

  const getTotal = () => {
    return cart.reduce(
      (acc, nextEl) => acc + nextEl.price * nextEl.quantity,
      0
    );
  };

  return (

    <>

      <div className="cart-body">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-container">
              <div className="cart-item-content">
                <img src={require(`../../${item.imageURL}`)} alt={item.name} />
                <div className="item-desc">
                  <div className="item-name">{item.name}</div>
                  <div className="btn-group">
                    <button
                      className="dec-btn"
                      onClick={() => manageQty("decrease",item.id)}
                    >
                      -
                    </button>
                    <div className="item-counter">{item.quantity}</div>
                    <button
                      className="inc-btn"
                      onClick={() => manageQty("increase",item.id)}
                    >
                      +
                    </button>
                    <div className="item-price">X&nbsp; Rs.{item.price}</div>
                  </div>
                </div>
                <div className="total-price">
                  Rs.{item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
          <div className="low-price-banner">
            <img
              src={require(`../../images/lowest-price.png`)}
              alt="You won't find it cheaper anywhere"
            />
            <p>You won't find it cheaper anywhere</p>
          </div>
        </div>
      </div>
      <footer className="cart-footer">
        <p>Promo code can be applied on payment page</p>
        <button
          className="shopping"
          onClick={props.handleClose}
        >
          <div className="checkout-title">Proceed to Checkout</div>
          <div className="cart-total-price">Rs.{getTotal()} &gt;</div>
        </button>
      </footer>
    </>
  );
};

export default CartItem;
