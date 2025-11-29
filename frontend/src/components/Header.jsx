import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-purple-primary text-white py-4 md:py-6 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <Link
          to="/"
          className="hover:opacity-90 transition-opacity text-center md:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-bold">ArtBook</h1>
          <p className="mt-1 text-purple-light text-sm md:text-base">
            Técnicas de Dibujo
          </p>
        </Link>

        {/* Enlace discreto al panel admin */}
        <nav className="flex justify-center md:justify-end">
          <Link
            to="/admin"
            className="text-xs md:text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/20 transition-colors"
          >
            Panel admin
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header


