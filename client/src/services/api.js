const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all cars with optional filters
export const getCars = async (filters = {}) => {
  try {
    const { category, make, sort } = filters;
    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (make) params.append('make', make);
    if (sort) params.append('sort', sort);
    
    const queryString = params.toString();
    const url = queryString ? `${API_URL}/cars?${queryString}` : `${API_URL}/cars`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch cars');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Get filter options
export const getFilterOptions = async () => {
  try {
    const response = await fetch(`${API_URL}/cars/filters`);
    if (!response.ok) throw new Error('Failed to fetch filter options');
    return await response.json();
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

// Process purchase
export const processPurchase = async (cartItems) => {
  try {
    const response = await fetch(`${API_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Purchase failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing purchase:', error);
    throw error;
  }
};

// Update car stock
export const updateCarStock = async (carId, newStock) => {
  try {
    const response = await fetch(`${API_URL}/cars/${carId}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock: newStock })
    });
    
    if (!response.ok) throw new Error('Failed to update stock');
    return await response.json();
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};