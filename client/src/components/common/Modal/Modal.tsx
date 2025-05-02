import css from './Modal.module.scss';
import { ComponentProps, MouseEventHandler, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { animated, useTransition } from '@react-spring/web';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS } from '@/constants/constants';

type Props = Overwrite<
  ComponentProps<typeof animated.div>,
  {
    children: ReactNode;
    closeOnOverlayClick?: boolean;
    overlayClassName?: string;
    isOpen: boolean;
    onClose: () => void;
    onDestroyed?: () => void;
    onRest?: () => void;
    isOnMobile: boolean;
    isMobileMenu?: boolean;
  }
>;

const ModalComponent = ({
  children,
  className,
  closeOnOverlayClick = true,
  overlayClassName,
  isOpen,
  onClose,
  onDestroyed,
  onRest,
  isOnMobile,
  isMobileMenu = false,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const animation =
    isMobileMenu && isOnMobile
      ? {
          from: { opacity: 0, transform: 'translateX(-90%)' },
          enter: { opacity: 1, transform: 'translateX(0%)' },
          leave: { opacity: 0, transform: 'translateX(-90%)' }
        }
      : isOnMobile
        ? {
            from: { opacity: 0, transform: 'translateY(100%)' },
            enter: { opacity: 1, transform: 'translateY(0%)' },
            leave: { opacity: 0, transform: 'translateY(100%)' }
          }
        : {
            from: { opacity: 0, transform: 'translate(-50%, -40%)' },
            enter: { opacity: 1, transform: 'translate(-50%, -50%)' },
            leave: { opacity: 0, transform: 'translate(-50%, -40%)' }
          };

  const transition = useTransition(isOpen, {
    ...animation,
    onDestroyed,
    onRest
  });

  const onOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === overlayRef.current && closeOnOverlayClick) onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return transition((style, isOpen) => {
    const modal = (
      <animated.div
        ref={overlayRef}
        className={cn(css.overlay, overlayClassName)}
        onClick={onOverlayClick}
        style={{ opacity: style.opacity }}
      >
        <animated.div
          {...props}
          ref={ref}
          className={cn(css.modal, { [css.mobile]: isOnMobile, [css.mobileMenu]: isMobileMenu }, className)}
          style={style}
          tabIndex={-1}
        >
          {children}
        </animated.div>
      </animated.div>
    );
    return isOpen ? createPortal(modal, document.body) : null;
  });
};

export const Modal = (props: Omit<Props, 'isOnMobile'>) => {
  const isOnMobile = useMediaQuery({ maxWidth: BREAKPOINTS.TABLET });
  return <ModalComponent key={String(isOnMobile)} {...props} isOnMobile={isOnMobile} />;
};
