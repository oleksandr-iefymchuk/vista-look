import { svgOption } from '@/constants/constants';
import sprite from '@/assets/sprite.svg';

const { DEFAULT_SIZE, DEFAULT_COLOR } = svgOption;

type Props = {
  name: string;
  width?: number;
  height?: number;
  title?: string;
  color?: string;
};

export const SvgIcon = ({ name, width = DEFAULT_SIZE, height = DEFAULT_SIZE, color = DEFAULT_COLOR }: Props) => {
  return (
    <svg stroke={color} fill={color} width={width} height={height}>
      <use xlinkHref={`${sprite}#${name}`} />
    </svg>
  );
};
