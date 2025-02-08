import React from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={18} className="mr-2" />
          {property.location}
        </div>
        <p className="text-gray-600 mb-4">{property.specs}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            Rp{property.price}
          </span>
          <Link
            to={`/property-detail/${property.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
