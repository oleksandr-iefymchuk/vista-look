import './CardInfoDescription.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useTabContext } from '../../../../../contexts/TabControlContext';

import ButtonWrapper from '../../../../common/Button/Button';
import Reviews from './components/Reviews/Reviews';
import Markdown from 'markdown-to-jsx';

const CardInfoDescription = ({ _id, description, param }) => {
  const { value, setValue } = useTabContext();
  const [markdown, setMarkdown] = useState('');
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedCharacteristics, setIsExpandedCharacteristics] =
    useState(false);

  const toggleExpandDescription = () =>
    setIsExpandedDescription(!isExpandedDescription);

  const toggleExpandCharacteristics = () =>
    setIsExpandedCharacteristics(!isExpandedCharacteristics);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const styles = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            width: 'auto',
            fontSize: '16px',
            borderBottom: '3px solid #fff',
            marginRight: '5px',
            padding: '5px',
            '&:hover': {
              background: 'transparent',
              borderBottom: '3px solid #008ec8'
            }
          }
        }
      }
    }
  });

  const renderCharacteristics = () => (
    <table>
      <tbody>
        {Object.entries(param).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const markdownPath =
    window.location.hostname === '127.0.0.1' ? '/public/markdown' : '/markdown';

  useEffect(() => {
    if (description) {
      fetch(`${markdownPath}/${description}`)
        .then(res => res.text())
        .then(markdown => {
          setMarkdown(markdown);
        });
    }
  }, [description, markdownPath]);

  return (
    <div className='card-info-description' id='reviews'>
      <ThemeProvider theme={styles}>
        <TabContext value={value}>
          <TabList onChange={handleChangeTab} className='custom-tab-list'>
            <Tab label='Опис' value='description' />
            <Tab label='Характеристики' value='characteristics' />
            <Tab label='Відгуки' value='reviews' />
          </TabList>
          <TabPanel value='description' className='description'>
            <div
              className={
                isExpandedDescription ? 'content-expanded' : 'content-collapsed'
              }
            >
              {!markdown.includes('<!doctype html>') ? (
                <Markdown>{markdown}</Markdown>
              ) : (
                <p>Опис відсутній</p>
              )}
            </div>
            {markdown &&
              !markdown.includes('<!doctype html>') &&
              markdown.split('\n').length > 10 && (
                <ButtonWrapper
                  buttonClassName='expand-btn'
                  icon={isExpandedDescription ? 'collapse' : 'expand'}
                  onClick={toggleExpandDescription}
                  buttonText={
                    isExpandedDescription ? 'Згорнути' : 'Показати повністю'
                  }
                />
              )}
          </TabPanel>
          <TabPanel value='characteristics' className='characteristics'>
            <div
              className={
                isExpandedCharacteristics
                  ? 'content-expanded'
                  : 'content-collapsed'
              }
            >
              {renderCharacteristics()}
            </div>
            {Object.keys(param).length > 6 && (
              <ButtonWrapper
                buttonClassName='expand-btn'
                icon={isExpandedCharacteristics ? 'collapse' : 'expand'}
                onClick={toggleExpandCharacteristics}
                buttonText={
                  isExpandedCharacteristics ? 'Згорнути' : 'Показати повністю'
                }
              />
            )}
          </TabPanel>
          <TabPanel value='reviews' className='reviews'>
            <Reviews productId={_id} />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
};

CardInfoDescription.propTypes = {
  _id: PropTypes.string,
  description: PropTypes.string,
  param: PropTypes.object,
  setReviews: PropTypes.func
};

export default CardInfoDescription;
