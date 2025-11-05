import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';


// Default products for Maria's Decadent Desserts & Cheesecake Co.
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    image: '/public/classic-cheesecake.jpg', // put your image in public/images/
    name: "Classic New York Cheesecake",
    category: 'Cheesecake',
    description: 'Rich and creamy New York–style cheesecake with a buttery graham crust.',
    specs: '10-inch, serves 10',
    rating: 4.9,
    price: 1200,
    quantity: 4,
  },
  {
    id: 2,
    image: '/public/chocolate-truffle.jpg',
    name: "Chocolate Decadence",
    category: 'Cake',
    description: 'Layered dark chocolate cake with silky ganache and chocolate shards.',
    specs: '8-inch, gluten optional',
    rating: 4.8,
    price: 900,
    quantity: 6,
  },
  {
    id: 3,
    image: '/public/lemon-tart.jpg',
    name: "Lemon Tartlets",
    category: 'Pastry',
    description: 'Zesty lemon curd in crisp tart shells — bright and refreshing.',
    specs: 'box of 6',
    rating: 4.6,
    price: 420,
    quantity: 3,
  },
{
  id: 4,
  image: '/public/blueberry-cheesecake.jpg',
  name: "Blueberry Swirl Cheesecake",
  category: 'Cheesecake',
  description: 'Smooth cream cheese filling swirled with fresh blueberry compote, on a buttery graham base.',
  specs: '9-inch round, serves 8–10',
  rating: 4.8,
  price: 1100,
  quantity: 6,
},
{
  id: 5,
  image: '/public/strawberry-Shortcake-Cheesecake.jpg',
  name: "Strawberry Shortcake Cheesecake",
  category: 'Cheesecake',
  description: 'Layers of creamy cheesecake, vanilla sponge, and fresh strawberry glaze topped with whipped cream.',
  specs: '10-inch, serves 10–12',
  rating: 4.7,
  price: 1250,
  quantity: 3,
},
{
  id: 6,
  image: '/public/mocha-espresso-cake.jpg',
  name: "Mocha Espresso Cake",
  category: 'Cake',
  description: 'Moist chocolate layers infused with espresso and frosted with coffee buttercream.',
  specs: '8-inch round, serves 8–10',
  rating: 4.9,
  price: 950,
  quantity: 5,
},
{
  id: 7,
  image: '/public/caramel-crunch-cake.jpg',
  name: "Caramel Crunch Cake",
  category: 'Cake',
  description: 'Vanilla sponge layered with caramel cream, topped with toffee bits and rich caramel drizzle.',
  specs: '8-inch round, serves 8–10',
  rating: 4.6,
  price: 900,
  quantity: 7,
},
{
  id: 8,
  image: '/public/raspberry-cream-puffs.jpg',
  name: "Raspberry Cream Puffs",
  category: 'Pastry',
  description: 'Light choux pastry shells filled with vanilla cream and raspberry compote, dusted with sugar.',
  specs: 'Box of 6 pieces',
  rating: 4.8,
  price: 450,
  quantity: 10,
},
{
  id: 9,
  image: '/public/chocolate-eclairs.jpg',
  name: "Chocolate Éclairs",
  category: 'Pastry',
  description: 'Classic French-style éclairs filled with custard and topped with rich chocolate ganache.',
  specs: 'Box of 6 pieces',
  rating: 4.7,
  price: 480,
  quantity: 12,
},
{
  id: 10,
  image: '/public/oreo-cookie-cheesecake.jpg',
  name: "Oreo Cookie Cheesecake",
  category: 'Cheesecake',
  description: 'Creamy cheesecake blended with crushed Oreo cookies and topped with whipped cream and cookie crumble.',
  specs: '9-inch round, serves 8–10',
  rating: 4.8,
  price: 1150,
  quantity: 5,
},
{
  id: 11,
  image: '/public/red-velvet-cake.jpg',
  name: "Red Velvet Cream Cheese Cake",
  category: 'Cake',
  description: 'Soft red velvet layers with a rich cream cheese frosting and a hint of cocoa.',
  specs: '8-inch round, serves 8–10',
  rating: 4.9,
  price: 980,
  quantity: 6,
},
{
  id: 12,
  image: '/public/butter-croissants.jpg',
  name: "Butter Croissants",
  category: 'Pastry',
  description: 'Flaky golden croissants made with layers of buttery pastry dough, baked to perfection.',
  specs: 'Box of 6 pieces',
  rating: 4.7,
  price: 420,
  quantity: 8,
},

];

function App() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState([]);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, { id: Date.now(), ...product }]);
  };

  const updateQuantity = (id, change) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + change) } : p
      )
    );
  };

  const addToCart = (id) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === id);
      if (found)
        return prev.map((x) =>
          x.id === id ? { ...x, qty: x.qty + 1 } : x
        );
      const product = products.find((p) => p.id === id);
      return [...prev, { id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const changeCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((x) =>
          x.id === id ? { ...x, qty: Math.max(0, x.qty + delta) } : x
        )
        .filter((x) => x.qty > 0)
    );
  };

  const totalValue = products.reduce(
    (s, p) => s + p.price * p.quantity,
    0
  );
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Router>
      <div className="container">
        <Header cartCount={cart.reduce((s, i) => s + i.qty, 0)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                updateQuantity={updateQuantity}
                addToCart={addToCart}
                totalValue={totalValue}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                updateQuantity={updateQuantity}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/add" element={<AddProductForm onAdd={addProduct} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeCartQty={changeCartQty}
                cartTotal={cartTotal}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function Header({ cartCount }) {
  return (
    <header className="header">
      <div>
        <h1>Maria's Decadent Desserts & Cheesecake Co.</h1>
        <p className="tag">Homemade Cakes • Cheesecakes • Desserts</p>
      </div>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/add">Add Product</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}

function Home({ products, updateQuantity, addToCart, totalValue }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const visible =
    filter === 'All' ? products : products.filter((p) => p.category === filter);

  return (
    <main>
      <div className="controls">
        <div>
          <label>Filter category: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="total">Overall Total: ₱{totalValue.toLocaleString()}</div>
      </div>

      <section className="grid">
        {visible.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            updateQuantity={updateQuantity}
            addToCart={addToCart}
          />
        ))}
      </section>
    </main>
  );
}

function ProductCard({ product, updateQuantity, addToCart }) {
  const subtotal = product.price * product.quantity;
  return (
    <article className={`card ${product.quantity < 5 ? 'low' : ''}`}>
      <Link to={`/product/${product.id}`} className="image-link">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="cat">{product.category}</p>
        <p>Price: ₱{product.price.toLocaleString()}</p>
        <p>Qty: {product.quantity}</p>
        <p>Subtotal: ₱{subtotal.toLocaleString()}</p>
        <div className="card-actions">
          <button onClick={() => updateQuantity(product.id, +1)}>+</button>
          <button onClick={() => updateQuantity(product.id, -1)}>-</button>
          <button onClick={() => addToCart(product.id)}>Add to Cart</button>
        </div>
        {product.quantity < 5 && <div className="lowstock">⚠️ Low Stock</div>}
      </div>
    </article>
  );
}

function ProductDetails({ products, updateQuantity, addToCart }) {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);
  const navigate = useNavigate();

  if (!product) return <div className="notfound">Product not found</div>;

  return (
    <div className="detail">
      <button onClick={() => navigate(-1)} className="back">
        ← Back
      </button>
      <div className="detail-grid">
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p className="cat">{product.category}</p>
          <p>{product.description}</p>
          <p>
            <strong>Specs:</strong> {product.specs}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating} / 5
          </p>
          <p>
            <strong>Price:</strong> ₱{product.price}
          </p>
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <div className="detail-actions">
            <button onClick={() => updateQuantity(product.id, +1)}>+</button>
            <button onClick={() => updateQuantity(product.id, -1)}>-</button>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
          {product.quantity < 5 && <div className="lowstock">⚠️ Low Stock</div>}
        </div>
      </div>
    </div>
  );
}

function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    image: '',
    name: '',
    category: '',
    description: '',
    specs: '',
    rating: '',
    price: '',
    quantity: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => v === '')) {
      alert('Please fill all fields');
      return;
    }
    const product = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity, 10),
    };
    onAdd(product);
    navigate('/');
  };

  return (
    <form className="addform" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image path (e.g. /images/mycake.jpg)" />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="specs" value={form.specs} onChange={handleChange} placeholder="Specification" />
      <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (e.g. 4.5)" />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price (number)" />
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity (number)" />
      <button type="submit">Add Product</button>
    </form>
  );
}

function Cart({ cart, changeCartQty, cartTotal }) {
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>₱{item.price}</td>
                <td>{item.qty}</td>
                <td>₱{(item.price * item.qty).toLocaleString()}</td>
                <td>
                  <button onClick={() => changeCartQty(item.id, +1)}>+</button>
                  <button onClick={() => changeCartQty(item.id, -1)}>-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ₱{cartTotal.toLocaleString()}</h3>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© Maria's Decadent Desserts & Cheesecake Co.</p>
    </footer>
  );
}

export default App;
