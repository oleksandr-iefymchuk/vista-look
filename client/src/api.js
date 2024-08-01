import axios from 'axios';

export const fetchPostOffice = async city => {
  try {
    const apiKey = import.meta.env.VITE_NOVA_POSHTA_API_KEY;

    const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
      apiKey,
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: city
      }
    });

    const data = response.data;

    if (data.success) {
      return data.data.map(department => ({
        value: department.Description,
        label: department.Description
      }));
    } else {
      throw new Error(data.errors.join(', '));
    }
  } catch (error) {
    console.error('Error fetching post offices:', error);
  }
};

export const fetchLocality = async city => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${city}&addressdetails=1&limit=5&accept-language=uk&countrycodes=UA`
    );
    const data = response.data;
    const formattedData = data.map(item => {
      const parts = [
        item.address.city || item.address.town || item.address.village,
        item.address.district,
        item.address.state
      ]
        .filter(Boolean)
        .join(', ');

      return {
        display_name: parts,
        address: item.address
      };
    });

    return formattedData;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
