import css from './CategoryList.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectCategory, selectSubcategory, closeMobileMenu } from '@/store/appReduser/actionCreators';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';

type Categories = {
  defaultMessage: string;
  linkName: string;
  id: string;
};

type Props = {
  categories: Array<Categories>;
  isOpen: boolean;
  onClose: () => void;
};

export const CategoryList = ({ categories, isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategoryClick = async ({ defaultMessage, linkName }: Categories) => {
    dispatch(selectCategory(defaultMessage));
    dispatch(selectSubcategory(null));
    dispatch(closeMobileMenu());
    onClose();
    navigate(`/catalog/${linkName}`);
  };

  return (
    <div className={cn(css.menu, { [css.show]: isOpen })}>
      <div className={css.list}>
        {categories.map((category, index) => (
          <div key={index} className={css.item} onClick={() => handleCategoryClick(category)}>
            <FormattedMessage id={category.id} defaultMessage={category.defaultMessage} />
          </div>
        ))}
      </div>
    </div>
  );
};
