import { useState } from "react";
import Head from "next/head";

const initialProducts = [
  { id: 1, name: "Luminous Foundation", price: 39.99, category: "face", image: "../luminous.jpg", rating: 4.5, badge: "Best Seller" },
  { id: 2, name: "Velvet Matte Lipstick", price: 24.99, category: "lips", image: "../lipstick.jpg", rating: 4.8, badge: "New" },
  { id: 3, name: "Smokey Eye Palette", price: 49.99, category: "eyes", image: "../eyeliner.jpg", rating: 4.7 },
  { id: 4, name: "Precision Eyeliner", price: 19.99, category: "eyes", image: "../eyeliner.jpg", rating: 4.6 },
  { id: 5, name: "Blush Duo", price: 29.99, category: "face", image: "../blush.jpg", rating: 4.4 },
  { id: 6, name: "Hydrating Primer", price: 34.99, category: "face", image: "../hydrating.jpg", rating: 4.3 },
  { id: 7, name: "Makeup Brush Set", price: 59.99, category: "tools", image: "../brush.jpg", rating: 4.9, badge: "Top Rated" },
  { id: 8, name: "Glitter Eyeshadow", price: 22.99, category: "eyes", image: "../glitter.jpg", rating: 4.2 },
  { id: 9, name: "Matte Liquid Lipstick", price: 26.99, category: "lips", image: "../lips.jpg", rating: 4.7 },
  { id: 10, name: "Makeup Sponge Set", price: 18.99, category: "tools", image: "../brush.jpg", rating: 4.5 },
  { id: 11, name: "Brow Pencil", price: 16.99, category: "eyes", image: "../pencil.jpg", rating: 4.6 },
  { id: 12, name: "Setting Spray", price: 28.99, category: "face", image: "../spray.jpg", rating: 4.8 },
];

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push(<i key={"full"+i} className="fas fa-star" />);
  if (halfStar) stars.push(<i key="half" className="fas fa-star-half-alt" />);
  for (let i = 0; i < emptyStars; i++) stars.push(<i key={"empty"+i} className="far fa-star" />);
  return stars;
}

export default function Home() {
  const [products] = useState(initialProducts);
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }
  function increaseQuantity(id) {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  }
  function decreaseQuantity(id) {
    setCart(prev => prev.flatMap(item => item.id === id ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item]));
  }
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Orlena- Premium Makeup Products</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      <style jsx global>{`
        /* (Paste all your CSS here, unchanged) */
      `}</style>
      <header>
        <div className="container">
          <div className="logo"><h1>Orlena</h1></div>
          <nav>
            <ul className={`menu${mobileMenuOpen ? " active" : ""}`}>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="cart-icon" onClick={() => setCartOpen(true)}>
            <i className="fas fa-shopping-cart" />
            <span className="cart-count">{cartCount}</span>
          </div>
          <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(m => !m)}>
            <i className="fas fa-bars" />
          </div>
        </div>
      </header>
      <div className={`cart-sidebar${cartOpen ? " open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setCartOpen(false)}><i className="fas fa-times" /></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  <div className="cart-item-quantity">
                    <button className="quantity-btn minus" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-btn plus" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <div className="remove-item" onClick={() => removeFromCart(item.id)}>
                  <i className="fas fa-trash" />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <p>Total: <span id="cart-total-price">${cartTotal.toFixed(2)}</span></p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Your Perfect Look</h1>
            <p>Premium makeup products for every style and occasion</p>
            <a href="#products" className="btn">Shop Now</a>
          </div>
        </div>
      </section>
      <section className="featured-categories">
        <div className="container">
          <h2 className="section-title">Shop By Category</h2>
          <div className="categories">
            <div className="category"><img src="../face.JPG" alt="Face Makeup" /><h3>Face</h3></div>
            <div className="category"><img src="../eyes.JPG" alt="Eyes Makeup" /><h3>Eyes</h3></div>
            <div className="category"><img src="../lips.JPG" alt="Lips Makeup" /><h3>Lips</h3></div>
            <div className="category"><img src="../brushes.JPG" alt="Brushes and Tools" /><h3>Tools</h3></div>
          </div>
        </div>
      </section>
      <section id="products" className="products">
        <div className="container">
          <h2 className="section-title">Best Sellers</h2>
          <div className="filter-controls">
            {['all', 'face', 'eyes', 'lips', 'tools'].map(cat => (
              <button key={cat} className={`filter-btn${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)} data-filter={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <div className="product-rating">{generateStarRating(product.rating)}</div>
                  <button className="add-to-cart" onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="promo">
        <div className="container">
          <div className="promo-content">
            <h2>Special Offer</h2>
            <p>Get 20% off on all products with code: GLAM20</p>
            <a href="#products" className="btn">Shop Now</a>
          </div>
        </div>
      </section>
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="../Makeup.JPG" alt="About Glam Beauty" />
            </div>
            <div className="about-text">
              <h2>About Glam Beauty</h2>
              <p>Glam Beauty is a premium makeup brand dedicated to helping you express your unique beauty. Our products are cruelty-free, made with high-quality ingredients, and designed to enhance your natural features.</p>
              <p>Founded in 2015, we've been committed to creating innovative beauty products that are accessible to everyone. Our team of beauty experts works tirelessly to develop formulas that are long-lasting, comfortable to wear, and available in a wide range of shades to suit all skin tones.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item"><i className="fas fa-map-marker-alt" /><p>123 Beauty Lane, Makeup City, MC 12345</p></div>
              <div className="info-item"><i className="fas fa-phone" /><p>+1 (555) 123-4567</p></div>
              <div className="info-item"><i className="fas fa-envelope" /><p>info@glambeauty.com</p></div>
            </div>
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required />
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Glam Beauty</h2>
              <p>Your beauty, our passion</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h3>Subscribe to our Newsletter</h3>
              <form onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your Email" required />
                <button type="submit" className="btn">Subscribe</button>
              </form>
            </div>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f" /></a>
                <a href="#"><i className="fab fa-instagram" /></a>
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-pinterest" /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Glam Beauty. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
