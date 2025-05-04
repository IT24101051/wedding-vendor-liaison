
export const VendorFooter = () => {
  return (
    <footer className="bg-wedding-navy text-white py-6">
      <div className="wedding-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2023 Wedding Vendor Liaison. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
