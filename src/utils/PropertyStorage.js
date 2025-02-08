// utils/PropertyStorage.js
export const getProperties = () => {
    return JSON.parse(localStorage.getItem("properties")) || [];
  };
  
  export const saveProperties = (properties) => {
    localStorage.setItem("properties", JSON.stringify(properties));
  };
  
  export const addProperty = (newProperty) => {
    const properties = getProperties();
    newProperty.id = properties.length > 0 ? properties[properties.length - 1].id + 1 : 1; // Buat ID baru
    properties.push(newProperty);
    saveProperties(properties);
  };
  
  export const updateProperty = (updatedProperty) => {
    const properties = getProperties();
    const updatedList = properties.map((prop) =>
      prop.id === updatedProperty.id ? updatedProperty : prop
    );
    saveProperties(updatedList);
  };
  
  export const deleteProperty = (id) => {
    const properties = getProperties();
    const filteredProperties = properties.filter((prop) => prop.id !== id);
    saveProperties(filteredProperties);
  };
  