import React from 'react';
import { 
  Home, 
  Map, 
  FileText, 
  Stamp, 
  ClipboardList, 
  Landmark, 
  Warehouse, 
  BedDouble 
} from 'lucide-react';

const IconWrapper = ({ icon: Icon, isSelected }) => (
  <Icon className={`w-8 h-8 transition-all ${isSelected ? 'text-green-600' : 'text-gray-500'}`} />
);

export const CertificateTypeSelect = ({ selectedType, onChange }) => {
  const types = [
    { id: 'SHM', icon: FileText, label: 'SHM' },
    { id: 'HGB', icon: Stamp, label: 'HGB' },
    { id: 'Hak Pakai', icon: ClipboardList, label: 'Hak Pakai' },
    { id: 'Hak Sewa', icon: ClipboardList, label: 'Hak Sewa' },
    { id: 'HGU', icon: FileText, label: 'HGU' },
    { id: 'Adat', icon: Stamp, label: 'Adat' },
    { id: 'Girik', icon: ClipboardList, label: 'Girik' },
    { id: 'PPJB', icon: FileText, label: 'PPJB' },
    { id: 'Lainnya', icon: FileText, label: 'Lainnya' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {types.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={(e) => onChange({ target: { name: 'certificate_type', value: id } })}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
            ${selectedType === id 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'}
          `}
        >
          <IconWrapper icon={icon} isSelected={selectedType === id} />
          <span className="mt-1 text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export const PropertyTypeSelect = ({ selectedType, onChange }) => {
  const types = [
    { id: 'Rumah', icon: Home, label: 'Rumah' },
    { id: 'Tanah', icon: Map, label: 'Tanah' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {types.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={(e) => onChange({ target: { name: 'type', value: id } })}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
            ${selectedType === id 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'}
          `}
        >
          <IconWrapper icon={icon} isSelected={selectedType === id} />
          <span className="mt-2 font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export const PropertyConditionSelect = ({ selectedCondition, onChange }) => {
  const conditions = [
    { id: 'Baru', icon: Landmark, label: 'Baru' },
    { id: 'Bekas', icon: Warehouse, label: 'Bekas' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {conditions.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={(e) => onChange({ target: { name: 'property_condition', value: id } })}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
            ${selectedCondition === id 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'}
          `}
        >
          <IconWrapper icon={icon} isSelected={selectedCondition === id} />
          <span className="mt-1 font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export const FurnitureConditionSelect = ({ selectedCondition, onChange }) => {
  const conditions = [
    { id: 'Berisi', icon: BedDouble, label: 'Berisi' },
    { id: 'Agak Kosong', icon: BedDouble, label: 'Agak Kosong' },
    { id: 'Kosong', icon: BedDouble, label: 'Kosong' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {conditions.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={(e) => onChange({ target: { name: 'furniture_condition', value: id } })}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
            ${selectedCondition === id 
              ? 'border-green-500 bg-green-50 text-green-700' 
              : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'}
          `}
        >
          <IconWrapper icon={icon} isSelected={selectedCondition === id} />
          <span className="mt-1 text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};
