import css from './Button.module.scss';
import { SvgIcon } from '@/components/common/SvgIcon';
import cn from 'classnames';

type Props = {
  disabled?: boolean;
  buttonClassName: string;
  imgClassName?: string;
  type?: 'submit' | 'reset' | 'button';
  buttonText?: string;
  onClick?: () => void;
  src?: string;
  icon?: string;
  svgColor?: string;
  svgWidth?: number;
  svgHeight?: number;
  value?: string | number;
};

export const ButtonWrapper = ({
  disabled,
  buttonClassName,
  type,
  buttonText,
  onClick,
  icon,
  svgColor,
  svgWidth,
  svgHeight,
  value
}: Props) => {
  return (
    <button className={cn(css.button, buttonClassName)} disabled={disabled} type={type} onClick={onClick}>
      {icon && <SvgIcon name={icon} color={svgColor} width={svgWidth} height={svgHeight} />}
      {buttonText}
      {value !== undefined && value !== 0 && <span className={css.value}>{value}</span>}
    </button>
  );
};
