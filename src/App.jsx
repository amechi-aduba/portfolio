import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import Navbar   from './components/navbar';

export default function App() {
  return (
    <BrowserRouter>
      <main className="bg-slate-300/20">
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
