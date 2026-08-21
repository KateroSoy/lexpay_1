import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-bg-card text-text-primary pt-24 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tight text-text-primary inline-block mb-6">
              LEXPAY
            </Link>
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary mb-6">LEXPAY</h3>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li><Link to="/explore" className="hover:text-text-primary transition-colors">Explore</Link></li>
              <li><Link to="/products" className="hover:text-text-primary transition-colors">Products</Link></li>
              <li><Link to="/services" className="hover:text-text-primary transition-colors">Services</Link></li>
              <li><Link to="/digital" className="hover:text-text-primary transition-colors">Digital</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-6">Ecosystem</h3>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition-colors">LEX AC</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">LEX Network</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">LEX Comp</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">LEX Barber</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">LEX Coffee</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Merdeka Petshop</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-6">Help</h3>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li><Link to="/help" className="hover:text-text-primary transition-colors">Pusat Bantuan</Link></li>
              <li><Link to="/orders" className="hover:text-text-primary transition-colors">Cek Pesanan</Link></li>
              <li><Link to="/contact" className="hover:text-text-primary transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/faq" className="hover:text-text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary mb-6">Company</h3>
            <ul className="flex flex-col gap-4 text-text-secondary">
              <li><Link to="/about" className="hover:text-text-primary transition-colors">Tentang</Link></li>
              <li><Link to="/careers" className="hover:text-text-primary transition-colors">Karier</Link></li>
              <li><Link to="/partners" className="hover:text-text-primary transition-colors">Partner</Link></li>
              <li><Link to="/blog" className="hover:text-text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-main opacity-60 text-text-secondary text-sm gap-4">
          <p>LEXPAY &copy; 2026</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-text-primary transition-colors">Refund Policy</Link>
          </div>
          <div className="flex gap-4">
            <button className="hover:text-text-primary transition-colors">Indonesia / IDR</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
