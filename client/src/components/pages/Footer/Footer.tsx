import css from './Footer.module.scss';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { foterNavLinks, languages } from '@/constants/constants';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Logo } from '@/components/common/Logo/Logo';
import { Translation, useTranslationContext } from '@/contexts/TranslationContext';
import { FormattedMessage } from 'react-intl';

export const Footer = () => {
  const navigate = useNavigate();
  const navigationHome = () => navigate('/');
  const { translation, setTranslation } = useTranslationContext();

  const handleChange = (event: SelectChangeEvent<Translation>) => {
    setTranslation(event.target.value as Translation);
  };

  return (
    <div className={css.wrap}>
      <nav className={css.navBar}>
        <h4>
          <FormattedMessage id='footer.forClients' defaultMessage='Клієнтам' />
        </h4>
        <ul>
          {foterNavLinks.map(({ link, id, defaultMessage }) => (
            <li key={link}>
              <Link to={link}>
                <FormattedMessage id={id} defaultMessage={defaultMessage} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={css.contacts}>
        <h4>
          <FormattedMessage id='footer.contacts' defaultMessage='Контакти' />
        </h4>
        <ul>
          <li>
            <SvgIcon name='phone' />
            +38 (093) 94-264-23
          </li>
          <li>
            <SvgIcon width={22} name='email' />
            bizmailer24@gmail.com
          </li>
        </ul>
      </div>

      <div className={css.copyright}>
        <Logo className={css.logo} onClick={navigationHome} />
        <p>
          &copy; <FormattedMessage id='footer.copyright' defaultMessage='2024-2025 Інтернет-магазин жіночого одягу «VistaLook»' />
        </p>
      </div>

      <Select
        value={translation}
        onChange={handleChange}
        variant='standard'
        size='small'
        disableUnderline
        MenuProps={{ disableScrollLock: true, disableRestoreFocus: true }}
        IconComponent={() => null}
        renderValue={(value) => <SvgIcon name={value} />}
        classes={{ select: css.lang }}
        sx={{ position: 'absolute', top: '30px', right: '5%' }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            <SvgIcon name={lang} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
