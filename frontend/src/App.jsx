import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import TechniqueDetail from './pages/TechniqueDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technique/:id" element={<TechniqueDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App


