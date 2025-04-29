import { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import { Autocomplete, TextField, Grid, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFetchLocalitiesQuery } from '@/api/orderAddressApi';

// const fetchLocality = async query => {
//   try {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5&accept-language=uk&countrycodes=UA`
//     );
//     const data = await response.json();
//     const formattedData = data.map(item => {
//       const parts = [
//         item.address.city || item.address.town || item.address.village,
//         item.address.district,
//         item.address.state
//       ]
//         .filter(Boolean)
//         .join(', ');

//       return {
//         display_name: parts,
//         address: item.address
//       };
//     });

//     return formattedData;
//   } catch (error) {
//     console.error('Error fetching suggestions:', error);
//     return [];
//   }
// };

type Address = {
  display_name: string;
  locality?: string;
  region: string;
};

type Props = {
  onCitySelect: (newValue: Address) => void;
  selectedCity: Address;
  error: boolean;
  helperText: string;
};

export const CityInput = ({ selectedCity, onCitySelect, error, helperText }: Props) => {
  const intl = useIntl();
  const [inputValue, setInputValue] = useState('');
  const debouncedSetInputValue = useMemo(() => debounce((value: string) => setInputValue(value), 1000), []);

  const { data: localities } = useFetchLocalitiesQuery(inputValue, { skip: inputValue.length <= 3 });

  const options = useMemo(() => {
    return localities?.map(({ display_name, address }) => ({
      display_name,
      locality: address.city || address.town || address.village,
      region: display_name.split(',').slice(1).join(',')
    }));
  }, [localities, selectedCity]);

  return (
    <Autocomplete
      getOptionLabel={(option) => option.display_name}
      filterOptions={(x) => x}
      options={options || []}
      value={selectedCity}
      onChange={(_, newValue) => onCitySelect(newValue)}
      onInputChange={(_, newInputValue) => debouncedSetInputValue(newInputValue)}
      disableClearable
      noOptionsText={intl.formatMessage({ id: 'cityInput.noMatches', defaultMessage: 'немає збігів, перевірте правильність написання' })}
      renderInput={(params) => (
        <TextField
          {...params}
          label={intl.formatMessage({ id: 'cityInput.address.label', defaultMessage: 'Вкажіть населений пункт' })}
          fullWidth
          variant='standard'
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={({ key, ...props }, option) => (
        <li key={key} {...props}>
          <Grid container alignItems='center'>
            <Grid sx={{ display: 'flex', width: 44 }}>
              <LocationOnIcon sx={{ color: 'text.secondary' }} />
            </Grid>
            <Grid sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
              <Box component='span' sx={{ fontWeight: 'regular' }}>
                {option.locality}
              </Box>
              <Typography variant='body2' color='text.secondary'>
                {option.region}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
};
