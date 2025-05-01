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
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: "Arial", sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #fff;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    ul {
        list-style: none;
    }
    img {
        max-width: 100%;
        height: auto;
        display: block;
    }
    .btn {
        display: inline-block;
        background-color: #ff6b6b;
        color: white;
        padding: 12px 30px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    .btn:hover {
        background-color: #ff5252;
        transform: translateY(-2px);
    }
    .section-title {
        text-align: center;
        margin-bottom: 40px;
        font-size: 2.5rem;
        color: #333;
        position: relative;
        padding-bottom: 15px;
    }
    .section-title::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background-color: #ff6b6b;
    }
    header {
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    header .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
    .logo h1 {
        font-size: 1.8rem;
        color: #ff6b6b;
        font-weight: bold;
    }
    .menu {
        display: flex;
    }
    .menu li {
        margin-left: 30px;
    }
    .menu a {
        font-weight: 500;
        position: relative;
        padding-bottom: 5px;
    }
    .menu a::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #ff6b6b;
        transition: width 0.3s ease;
    }
    .menu a:hover::after,
    .menu a.active::after {
        width: 100%;
    }
    .cart-icon {
        position: relative;
        cursor: pointer;
        font-size: 1.3rem;
    }
    .cart-count {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #ff6b6b;
        color: white;
        font-size: 0.7rem;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mobile-menu-btn {
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .cart-sidebar {
        position: fixed;
        top: 0;
        right: -400px;
        width: 350px;
        height: 100vh;
        background-color: white;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transition: right 0.3s ease;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }
    .cart-sidebar.open {
        right: 0;
    }
    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    .close-cart {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
    }
    .cart-items {
        flex: 1;
        overflow-y: auto;
    }
    .cart-item {
        display: flex;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    .cart-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        margin-right: 15px;
    }
    .cart-item-details {
        flex: 1;
    }
    .cart-item-title {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .cart-item-price {
        color: #ff6b6b;
        font-weight: bold;
    }
    .cart-item-quantity {
        display: flex;
        align-items: center;
        margin-top: 5px;
    }
    .quantity-btn {
        background: #f0f0f0;
        border: none;
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .quantity-value {
        margin: 0 10px;
    }
    .remove-item {
        color: #999;
        cursor: pointer;
        margin-left: auto;
    }
    .cart-total {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #eee;
    }
    .cart-total p {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 15px;
    }
    .checkout-btn {
        width: 100%;
        padding: 12px;
        background-color: #ff6b6b;
        color: white;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .checkout-btn:hover {
        background-color: #ff5252;
    }
    .hero {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("../makeup.jpg");
        background-size: cover;
        background-position: center;
        color: white;
        padding: 150px 0;
        text-align: center;
    }
    .hero-content h1 {
        font-size: 3.5rem;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    .hero-content p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    .featured-categories {
        padding: 80px 0;
        background-color: #f9f9f9;
    }
    .categories {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
    }
    .category {
        text-align: center;
        transition: transform 0.3s ease;
        cursor: pointer;
    }
    .category:hover {
        transform: translateY(-10px);
    }
    .category img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 15px;
    }
    .category h3 {
        font-size: 1.3rem;
        margin-top: 15px;
    }
    .products {
        padding: 80px 0;
    }
    .filter-controls {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        flex-wrap: wrap;
    }
    .filter-btn {
        background: none;
        border: none;
        padding: 10px 20px;
        margin: 0 5px 10px;
        cursor: pointer;
        font-weight: 500;
        border-radius: 30px;
        transition: all 0.3s ease;
    }
    .filter-btn:hover,
    .filter-btn.active {
        background-color: #ff6b6b;
        color: white;
    }
    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 30px;
    }
    .product-card {
        background-color: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .product-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    .product-image {
        height: 250px;
        overflow: hidden;
        position: relative;
    }
    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    .product-card:hover .product-image img {
        transform: scale(1.1);
    }
    .product-badge {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: #ff6b6b;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    .product-info {
        padding: 20px;
    }
    .product-title {
        font-size: 1.1rem;
        margin-bottom: 10px;
        font-weight: bold;
    }
    .product-price {
        color: #ff6b6b;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 15px;
    }
    .product-rating {
        color: #ffc107;
        margin-bottom: 15px;
    }
    .add-to-cart {
        width: 100%;
        padding: 10px;
        background-color: #ff6b6b;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: bold;
    }
    .add-to-cart:hover {
        background-color: #ff5252;
    }
    .promo {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url("/placeholder.svg?height=600&width=1200");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        color: white;
        padding: 100px 0;
        text-align: center;
    }
    .promo-content h2 {
        font-size: 2.5rem;
        margin-bottom: 20px;
    }
    .promo-content p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    .about {
        padding: 80px 0;
        background-color: #f9f9f9;
    }
    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        align-items: center;
    }
    .about-image img {
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    .about-text h2 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #333;
    }
    .about-text p {
        margin-bottom: 20px;
        line-height: 1.8;
    }
    .contact {
        padding: 80px 0;
    }
    .contact-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 50px;
    }
    .contact-info {
        background-color: #f9f9f9;
        padding: 30px;
        border-radius: 10px;
    }
    .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .info-item i {
        font-size: 1.5rem;
        color: #ff6b6b;
        margin-right: 15px;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 107, 107, 0.1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .contact-form {
        display: grid;
        gap: 20px;
    }
    .contact-form input,
    .contact-form textarea {
        width: 100%;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
    }
    .contact-form textarea {
        height: 150px;
        resize: vertical;
    }
    footer {
        background-color: #333;
        color: white;
        padding: 80px 0 20px;
    }
    .footer-content {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        margin-bottom: 50px;
    }
    .footer-logo h2 {
        font-size: 1.8rem;
        color: #ff6b6b;
        margin-bottom: 15px;
    }
    .footer-links h3,
    .footer-newsletter h3,
    .footer-social h3 {
        font-size: 1.2rem;
        margin-bottom: 20px;
        position: relative;
        padding-bottom: 10px;
    }
    .footer-links h3::after,
    .footer-newsletter h3::after,
    .footer-social h3::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 2px;
        background-color: #ff6b6b;
    }
    .footer-links ul li {
        margin-bottom: 10px;
    }
    .footer-links ul li a {
        transition: color 0.3s ease;
    }
    .footer-links ul li a:hover {
        color: #ff6b6b;
    }
    .footer-newsletter form {
        display: flex;
        margin-top: 20px;
    }
    .footer-newsletter input {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 5px 0 0 5px;
    }
    .footer-newsletter .btn {
        border-radius: 0 5px 5px 0;
        padding: 10px 15px;
    }
    .social-icons {
        display: flex;
        gap: 15px;
    }
    .social-icons a {
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.3s ease;
    }
    .social-icons a:hover {
        background-color: #ff6b6b;
    }
    .footer-bottom {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    @media (max-width: 1024px) {
        .categories {
        grid-template-columns: repeat(2, 1fr);
        }
        .about-content,
        .contact-content,
        .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
        }
        .about-image {
        order: 2;
        }
        .about-text {
        order: 1;
        }
    }
    @media (max-width: 768px) {
        .menu {
        display: none;
        }
        .mobile-menu-btn {
        display: block;
        }
        .menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: white;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        }
        .menu.active li {
        margin: 10px 0;
        }
        .hero-content h1 {
        font-size: 2.5rem;
        }
        .product-grid {
        grid-template-columns: repeat(2, 1fr);
        }
        .footer-content {
        grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 576px) {
        .categories {
        grid-template-columns: 1fr;
        }
        .product-grid {
        grid-template-columns: 1fr;
        }
        .footer-content {
        grid-template-columns: 1fr;
        }
        .cart-sidebar {
        width: 100%;
        }
    }
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
