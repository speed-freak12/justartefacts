import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Feather, Coins, Palette, ChevronLeft, LogIn, UserPlus, LogOut, User } from 'lucide-react';

// --- Firebase SDK Imports ---
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, query } from "firebase/firestore";

// --- Firebase Configuration ---
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEfoSzjyubxPUNLylH1zFKcAIgS7LWFk",
  authDomain: "justartefacts-9eaac.firebaseapp.com",
  projectId: "justartefacts-9eaac",
  storageBucket: "justartefacts-9eaac.firebaseio.com",
  messagingSenderId: "655864895362",
  appId: "1:655864895362:web:3456707cd8a839203ba19b",
  measurementId: "G-7XLQDVND19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// --- Login Page Component ---
function LoginPage({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-6">
           <Feather className="text-orange-400" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8">Sign in to continue to Just Artefacts</p>
        {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold p-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 text-lg">
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('signup')} className="text-orange-400 hover:underline font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

// --- SignUp Page Component ---
function SignUpPage({ onNavigate, onSignUpSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUpSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-6">
           <UserPlus className="text-orange-400" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
        <p className="text-center text-gray-400 mb-8">Join the Just Artefacts community</p>
        {error && <p className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white font-bold p-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 text-lg">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-orange-400 hover:underline font-semibold">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}


function ProductDetail({ item, onBack }) {
  return (
    <section className="py-12 md:py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="flex items-center mb-8 text-orange-400 hover:text-orange-500 transition-colors font-semibold">
          <ChevronLeft size={20} className="mr-2" />
          Back to Marketplace
        </button>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-800 p-4 rounded-lg">
            <img src={item.imageUrl.replace('600x400', '800x600')} alt={item.name} className="w-full rounded-lg shadow-lg object-cover" />
          </div>
          <div>
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${item.type === 'Artisan' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
              {item.type}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-gray-400 text-lg mb-4">by {item.artist}</p>
            <p className="text-3xl font-semibold text-orange-400 mb-6">{item.price}</p>
            <h3 className="text-xl font-bold text-white mb-2">Description</h3>
            <p className="text-gray-300 leading-relaxed mb-8">{item.description}</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 text-lg flex-1">
                Add to Cart
              </button>
              <button className="bg-gray-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 text-lg flex-1">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Marketplace Component ---
function Marketplace({ user, onSignOut }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [featuredItems, setFeaturedItems] = useState([]);
  
    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productsCollection);

            if (productSnapshot.empty) {
                // If no products, seed the database with initial data
                await seedDatabase();
                // Re-fetch after seeding
                const newSnapshot = await getDocs(productsCollection);
                const productList = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFeaturedItems(productList);
            } else {
                const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFeaturedItems(productList);
            }
        };

        fetchProducts();
    }, []);

    // Function to add initial data to Firestore (only runs if collection is empty)
    const seedDatabase = async () => {
        const initialItems = [
            { id: 1, type: 'Artisan', name: 'Hand-carved Wooden Elephant', artist: 'Ramesh Kumar', price: '₹2,500', imageUrl: 'https://placehold.co/600x400/333333/FFFFFF?text=Wooden+Elephant', description: 'A beautifully detailed wooden elephant, hand-carved by skilled artisans from Rajasthan. Made from sustainable mango wood, this piece showcases intricate floral patterns and is a perfect addition to any home decor.' },
            { id: 2, type: 'Collector', name: 'Vintage Silver Rupee Coin', artist: 'Gupta Collections', price: '₹5,800', imageUrl: 'https://placehold.co/600x400/333333/FFFFFF?text=Vintage+Coin', description: "A rare silver one rupee coin from the British India era, minted in 1918. This collector's item is in excellent condition with clear markings, making it a valuable piece of history for any numismatist." },
            { id: 3, type: 'Artisan', name: 'Pattachitra Scroll Painting', artist: 'Priyanka Mohanty', price: '₹8,000', imageUrl: 'https://placehold.co/600x400/333333/FFFFFF?text=Scroll+Painting', description: "This exquisite Pattachitra scroll painting from Odisha depicts a scene from the Ramayana. Created using natural pigments on a treated cloth canvas, it's a testament to a traditional art form passed down through generations." },
            { id: 4, type: 'Collector', name: 'Rare British India Stamp', artist: 'History Buffs', price: '₹12,200', imageUrl: 'https://placehold.co/600x400/333333/FFFFFF?text=Rare+Stamp', description: "An unused 'Queen Victoria' postage stamp from 1854. This four-anna stamp with the Queen's head inverted is one of the rarest philatelic items from the British India period. A true treasure for collectors." }
        ];

        console.log("Seeding database with initial products...");
        for (const item of initialItems) {
            await addDoc(collection(db, 'products'), item);
        }
        console.log("Database seeded successfully.");
    };
  
    const handleViewItem = (item) => {
      setSelectedItem(item);
      window.scrollTo(0, 0);
    };
  
    const handleBack = () => {
      setSelectedItem(null);
    };

    return (
    <div className="bg-gray-900 text-gray-200 font-sans antialiased">
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Feather className="text-orange-400" size={28} />
                    <h1 className="text-2xl font-bold text-white tracking-wider">Just Artefacts</h1>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#home" onClick={() => handleBack()} className="hover:text-orange-400 transition-colors duration-300">Home</a>
                    <a href="#about" onClick={() => handleBack()} className="hover:text-orange-400 transition-colors duration-300">About</a>
                    <a href="#featured" onClick={() => handleBack()} className="hover:text-orange-400 transition-colors duration-300">Marketplace</a>
                    <a href="#contact" onClick={() => handleBack()} className="hover:text-orange-400 transition-colors duration-300">Contact</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2 text-sm">
                      <User size={16} />
                      <span>{user.email}</span>
                    </div>
                    <button onClick={onSignOut} className="hidden md:inline-flex items-center bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300">
                      <LogOut size={16} className="mr-2"/>
                      Sign Out
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        <a href="#home" onClick={() => { setIsMenuOpen(false); handleBack(); }} className="hover:text-orange-400">Home</a>
                        <a href="#about" onClick={() => { setIsMenuOpen(false); handleBack(); }} className="hover:text-orange-400">About</a>
                        <a href="#featured" onClick={() => { setIsMenuOpen(false); handleBack(); }} className="hover:text-orange-400">Marketplace</a>
                        <a href="#contact" onClick={() => { setIsMenuOpen(false); handleBack(); }} className="hover:text-orange-400">Contact</a>
                        <div className="flex items-center space-x-2 text-sm pt-4 border-t border-gray-700 w-full justify-center">
                           <User size={16} />
                           <span>{user.email}</span>
                        </div>
                        <button onClick={onSignOut} className="w-full mx-4 flex items-center justify-center bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300">
                           <LogOut size={16} className="mr-2"/>
                           Sign Out
                        </button>
                    </nav>
                </div>
            )}
        </header>
        <main>
            {selectedItem ? (
                <ProductDetail item={selectedItem} onBack={handleBack} />
            ) : (
                <>
                    <section id="home" className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a0s54b0db644?q=80&w=2070&auto=format&fit=crop')" }}>
                       <div className="absolute inset-0 bg-black/60"></div>
                       <div className="relative z-10 p-6">
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 tracking-wide">Connecting Artisans & Collectors</h2>
                            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
                                An online marketplace for India's master craftspeople and passionate collectors of coins and currency.
                            </p>
                            <a href="#featured" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 text-lg">
                                Explore the Collection
                            </a>
                       </div>
                    </section>
                    <section id="about" className="py-20 bg-gray-800">
                      <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                          <h3 className="text-3xl md:text-4xl font-bold text-white">Our Vision</h3>
                          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                        </div>
                        <div className="max-w-4xl mx-auto text-center text-gray-300 text-lg space-y-6">
                          <p>India's handicraft industry, the country's second-highest employment-generating industry after agriculture, provides livelihood to over 200 million artisans. They are master crafts people and skilled workers but cannot sell their products to larger markets due to the lack of digital connectivity and high transport costs.</p>
                          <p>Similarly, collectors of coins and currency cannot exchange old money and coins securely because they lack a safe marketplace.</p>
                          <p className="font-semibold text-white">'Just Artefacts' is envisioned as an online marketplace that brings these two communities together. Through its easy trading experience, the site can facilitate collectors and artisans, creating a sustainable network.</p>
                        </div>
                      </div>
                    </section>
                    <section className="py-20 bg-gray-900">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h3 className="text-3xl md:text-4xl font-bold text-white">For Artisans & Collectors</h3>
                                <p className="text-gray-400 mt-2">A fair and secure platform for everyone.</p>
                                 <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="text-center p-8 border border-gray-700 rounded-2xl bg-gray-800/50"><Palette size={48} className="mx-auto text-orange-400 mb-4"/><h4 className="text-2xl font-bold mb-3 text-white">For the Artisan</h4><p className="text-gray-300">Showcase your incredible craft to a global audience. Get fair prices for your work, connect directly with buyers, and grow your business without the middlemen.</p></div>
                                <div className="text-center p-8 border border-gray-700 rounded-2xl bg-gray-800/50"><Coins size={48} className="mx-auto text-orange-400 mb-4"/><h4 className="text-2xl font-bold mb-3 text-white">For the Collector</h4><p className="text-gray-300">Discover rare and authentic coins and currencies. Trade securely with verified sellers, build your collection, and connect with a community of fellow enthusiasts.</p></div>
                            </div>
                        </div>
                    </section>
                    <section id="featured" className="py-20 bg-gray-800">
                      <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                          <h3 className="text-3xl md:text-4xl font-bold text-white">Featured Artefacts</h3>
                          <p className="text-gray-400 mt-2">Discover unique items from our community</p>
                          <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                          {featuredItems.map(item => (
                            <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-2 transition-all duration-300 group">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                              <div className="p-5">
                                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${item.type === 'Artisan' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>{item.type}</span>
                                <h4 className="font-bold text-lg text-white mb-1">{item.name}</h4>
                                <p className="text-gray-400 text-sm mb-3">by {item.artist}</p>
                                <div className="flex justify-between items-center">
                                  <p className="text-xl font-semibold text-orange-400">{item.price}</p>
                                  <button onClick={() => handleViewItem(item)} className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors duration-300">View</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                    <section id="contact" className="py-20 bg-gray-900">
                         <div className="container mx-auto px-6">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl md:text-4xl font-bold text-white">Get in Touch</h3>
                                <p className="text-gray-400 mt-2">We'd love to hear from you.</p>
                                 <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                            </div>
                            <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl border border-gray-700">
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <input type="text" placeholder="Your Name" className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                                        <input type="email" placeholder="Your Email" className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                                    </div>
                                    <textarea placeholder="Your Message" rows="5" className="w-full bg-gray-700 text-white p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                                    <div className="text-center">
                                         <button type="submit" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 text-lg">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
        <footer className="bg-gray-800 py-10">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <div className="flex justify-center items-center space-x-2 mb-4">
                    <Feather className="text-orange-400" size={22} />
                    <h2 className="text-xl font-bold text-white">Just Artefacts</h2>
                </div>
                <p>&copy; {new Date().getFullYear()} Just Artefacts. All Rights Reserved.</p>
                <p>Creating a sustainable network for artisans and collectors.</p>
            </div>
        </footer>
    </div>
    );
}

// --- Main App Component ---
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login'); // 'login', 'signup', or 'app'
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPage('app');
      } else {
        setUser(null);
        setPage('login');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderPage = () => {
    if (page === 'app' && user) {
      return <Marketplace user={user} onSignOut={handleSignOut} />;
    }
    if (page === 'signup') {
      return <SignUpPage onNavigate={setPage} onSignUpSuccess={() => setPage('app')} />;
    }
    return <LoginPage onNavigate={setPage} onLoginSuccess={() => setPage('app')} />;
  };

  return <>{renderPage()}</>;
}

