import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-purple-primary text-white py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <Link to="/" className="block text-center hover:opacity-90 transition-opacity">
          <h1 className="text-4xl font-bold">ArtBook</h1>
          <p className="text-center mt-2 text-purple-light">Técnicas de Dibujo</p>
        </Link>
      </div>
    </header>
  )
}

export default Header


