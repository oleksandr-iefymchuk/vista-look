import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import parse from 'autosuggest-highlight/parse';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fetchLocality } from '../../../../../api';

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

const CityInput = ({ selectedCity, onCitySelect, error, helperText }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const fetch = useMemo(
    () =>
      debounce(async (request, callback) => {
        if (request.input.length > 3) {
          const results = await fetchLocality(request.input);
          callback(results);
        } else {
          callback([]);
        }
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(selectedCity ? [selectedCity] : []);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        let newOptions = [];

        if (selectedCity) {
          newOptions = [selectedCity];
        }

        if (results) {
          console.log('results:', results);
          newOptions = [
            ...newOptions,
            ...results.map(result => ({
              display_name: result.display_name,
              structured_formatting: {
                locality:
                  result.address.city ||
                  result.address.town ||
                  result.address.village,
                region: result.display_name.split(',').slice(1).join(',')
              }
            }))
          ];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [selectedCity, inputValue, fetch]);

  const handleOptionSelect = (event, newValue) => {
    onCitySelect(newValue);
  };

  return (
    <Autocomplete
      getOptionLabel={option => option.display_name}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={selectedCity}
      noOptionsText='немає збігів, перевірте правильність написання'
      onChange={handleOptionSelect}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disableClearable={true}
      renderInput={params => (
        <TextField
          {...params}
          label='Вкажіть населений пункт'
          fullWidth
          variant='standard'
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];
        const parts = parse(
          option.structured_formatting.locality,
          matches.map(match => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems='center'>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component='span'
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant='body2' color='text.secondary'>
                  {option.structured_formatting.region}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

CityInput.propTypes = {
  onCitySelect: PropTypes.func,
  selectedCity: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string
};

export default CityInput;
