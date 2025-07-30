const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@ecommerce.com</p>
          <p>Phone: +254 712 345 678</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#"><i className="fab fa-facebook-f"  /></a>
            <a href="#"><i className="fab fa-twitter " /></a>
            <a href="#"><i className="fab fa-instagram " /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} E-commerce. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
