import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecentOrders from "./components/RecentOrders";
import NewOrder from "./components/NewOrder";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="recent-orders" element={<RecentOrders />} />
        <Route path="new-order" element={<NewOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
