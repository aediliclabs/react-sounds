import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Aedilic Inc. Made with ♥.</p>
      </div>
    </footer>
  );
};

export default Footer;
