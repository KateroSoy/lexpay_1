import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-lex-black text-white pt-24 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tight text-white inline-block mb-6">
              LEXPAY
            </Link>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-6">LEXPAY</h3>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/digital" className="hover:text-white transition-colors">Digital</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Ecosystem</h3>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">LEX AC</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LEX Network</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LEX Comp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LEX Barber</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LEX Coffee</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Merdeka Petshop</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Help</h3>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><Link to="/help" className="hover:text-white transition-colors">Pusat Bantuan</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Cek Pesanan</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">Tentang</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Karier</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Partner</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm gap-4">
          <p>LEXPAY &copy; 2026</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Indonesia / IDR</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
