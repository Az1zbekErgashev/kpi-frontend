import { ArrowLeftRight } from 'lucide-react';
import React from 'react';
import Tooltip from 'antd/lib/tooltip';
import { useTranslation } from 'react-i18next';
export function ScrollWithShift() {
  const { t } = useTranslation();
  return (
    <Tooltip
      color="#151a2d"
      style={{ color: 'white' }}
      placement="bottom"
      title={
        <div className="scroll-tooltip__content">
          <p className="scroll-tooltip__title">{t('Howtoscroll')}</p>
          <ol className="scroll-tooltip__steps">
            <li>{t('hover_your_cursor')}</li>
            <li dangerouslySetInnerHTML={{ __html: t('hold_down_the_shift') }}></li>
            <li>{t('use_your_mouse_wheel')}</li>
          </ol>
          <div className="scroll-tooltip__demo">
            <div className="scroll-tooltip__mouse">
              <div className="scroll-tooltip__mouse-body"></div>
              <div className="scroll-tooltip__mouse-wheel"></div>
            </div>
            <ArrowLeftRight className="scroll-tooltip__arrow" />
          </div>
        </div>
      }
      trigger={'hover'}
    >
      <div className="scroll-instruction">
        <div className="scroll-instruction__banner">
          <ArrowLeftRight className="scroll-instruction__icon scroll-instruction__icon--animated" />
          <span className="scroll-instruction__text">{t('for_horizontal_scrolling')}</span>
          <kbd className="scroll-instruction__kbd">Shift</kbd>
          <span>+</span>
          <div className="scroll-instruction__mouse">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 5L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <rect x="9" y="2" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
