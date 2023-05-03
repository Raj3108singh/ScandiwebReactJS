//import logo from "./logo.svg";

import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./Components/Category/Category";
import Navigation from "./Components/Navigation/Navigation";
import PDP from "./Components/PDP/PDP";
import Cart from "./Components/Cart/Cart";

import Cartoverlay from "./Components/Cart/Cartoverlay";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Category />} />
          <Route path="/products/:category" element={<Category />} />
          <Route path="/product/:id" element={<PDP />} />
          <Route path="/cart" element={<Cart />} />
          {/*<Route path="/cartoverlay" element={<Cartoverlay />} />*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
