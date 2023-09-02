import React from "react";
import { useSelector } from "react-redux";

import styles from "../../styles/Cart.module.css";

const Cart = () => {
  const { cart } = useSelector(({ user }) => user);

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your SingleCategory</h2>

      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
         <>
        <div className={styles.list}>
          {cart.map((item) => {
            const { title, category, images, price, id, quantity } = item;

            return (
              <div className={styles.item} key={id}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${images[0]})` }}
                />
                <div className={styles.info}>
                  <h3 className={styles.name}>{title}</h3>
                  <div className={styles.category}>{category.name}</div>
                </div>

                <div className={styles.price}>${price}</div>

                <div className={styles.quantity}>
                  <div className={styles.minus}>
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                      />
                    </svg>
                  </div>

                  <span>{quantity}</span>

                  <div className={styles.plus}>
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                      />
                    </svg>
                  </div>
                </div>

                <div className={styles.total}>${price *  quantity}</div>
               
               <div className={styles.close}>
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
               </div>             
            </div>
            );
          })}
        </div>
        
         <div className={styles.actions}>
           <div className={styles.total}>
               TOTAL PRICE: {" "}
               <span>
                  ${sumBy(({quantity, price}) => quantity * price )}
               </span>
           </div>

           <button className={styles.proceed}>Proceed to checkout</button>
         </div>
        </>
      )}
    </section>
  );
};

export default Cart;
