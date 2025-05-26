import { ChevronDown, LayoutDashboard, Zap } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { StyledSitebar } from './style';
import { ADMIN_NAVIGATE } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function Sitebar() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState('/');

  const handleItemClick = (index: number, path: string) => {
    const item = ADMIN_NAVIGATE[index];
    if (item.children) {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      setActiveItem(path);
    }
  };
  return (
    <StyledSitebar>
      <div className="magnificent-sidebar">
        <div className="sidebar-background"></div>
        <div className="sidebar-content">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-icon">
                <Zap className="logo-svg" />
              </div>
              <div className="logo-text">
                <h2>KPI</h2>
                <span>Dashboard</span>
              </div>
            </div>
            <div className="logo-glow"></div>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            <div className="nav-header">
              <span>Navigation</span>
            </div>
            <ul className="nav-list">
              {ADMIN_NAVIGATE.map((item, index) => {
                const isOpen = openIndex === index;
                const isActive = activeItem === item.path;
                const Icon = item.icon;

                return (
                  <li className="nav-item" key={index}>
                    <motion.div
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleItemClick(index, item.path)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="nav-link-content">
                        <div className="nav-icon">
                          <Icon />
                        </div>
                        <span className="nav-text">{t(item.key)}</span>
                      </div>
                      {item.children && (
                        <motion.div
                          className="chevron-container"
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      )}
                      <div className="nav-link-glow"></div>
                    </motion.div>

                    {/* Submenu */}
                    <AnimatePresence initial={false}>
                      {item.children && isOpen && (
                        <motion.ul
                          className="submenu"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        >
                          {item.children.map((child, childIndex) => (
                            <motion.li
                              key={childIndex}
                              className="submenu-item"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                delay: childIndex * 0.1,
                                duration: 0.3,
                              }}
                            >
                              <div
                                className={`submenu-link ${activeItem === child.path ? 'active' : ''}`}
                                onClick={() => setActiveItem(child.path)}
                              >
                                <div className="submenu-dot"></div>
                                <span>{t(child.key)}</span>
                              </div>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <div className="footer-year">© 2025 KPI Dashboard</div>
          </div>
        </div>
      </div>
    </StyledSitebar>
  );
}
