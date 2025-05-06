import logo from '@/assets/logo.png';
import css from './Logo.module.scss';

type Props = {
  onClick: () => void;
  className?: string;
};

export const Logo = ({ onClick, className }: Props) => {
  return (
    <div className={css.logo}>
      <img className={className} src={logo} alt='logo' onClick={onClick} />
    </div>
  );
};
