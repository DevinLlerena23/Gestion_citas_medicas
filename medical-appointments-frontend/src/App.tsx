import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/appointments/:id" element={<DetailPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}