import { ChevronDown, Zap } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { StyledSitebar } from './style';
import { ADMIN_NAVIGATE } from 'utils/consts';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dayjs from 'dayjs';

export function Sitebar() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleItemClick = (index: number, path?: string, isParent?: boolean) => {
    const item = ADMIN_NAVIGATE[index];
    if (item?.children && isParent) {
      setOpenIndex(openIndex === index ? null : index); // Toggle only for parent click
    }
    // Do not reset openIndex for child clicks to keep parent open unless manually closed
  };

  return (
    <StyledSitebar>
      <div className="magnificent-sidebar">
        <div className="sidebar-background"></div>
        <div className="sidebar-content">
          {/* Logo Section */}
          <Link to="/" className="sidebar-logo">
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
          </Link>
          {/* Navigation */}
          <nav className="navigation">
            <div className="nav-header">
              <span>Navigation</span>
            </div>
            <ul className="nav-list">
              {ADMIN_NAVIGATE.map((item, index) => {
                const isOpen = openIndex === index;
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                const isChildActive = item.children?.some((child) => currentPath === child.path);

                return (
                  <li className="nav-item" key={index}>
                    <motion.div
                      className={`nav-link ${isActive || isChildActive ? 'active' : ''}`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.path ? (
                        <NavLink
                          to={item.path}
                          className="nav-link-content"
                          onClick={() => handleItemClick(index, item?.path)}
                        >
                          <div className="nav-icon">{Icon && <Icon />}</div>
                          <span className="nav-text">{t(item.key)}</span>
                        </NavLink>
                      ) : (
                        <div
                          className="nav-link-content"
                          onClick={() => handleItemClick(index, undefined, true)} // Toggle for parent
                          role="button"
                          tabIndex={0} // For accessibility
                        >
                          <div className="nav-icon">{Icon && <Icon />}</div>
                          <span className="nav-text">{t(item.key)}</span>
                        </div>
                      )}
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
                              {child.path ? (
                                <NavLink
                                  to={child.path}
                                  className={`submenu-link ${currentPath === child.path ? 'active' : ''}`}
                                  onClick={() => handleItemClick(index, child?.path)}
                                >
                                  <div className="submenu-dot"></div>
                                  <span className="nav-text">{t(child.key)}</span>
                                </NavLink>
                              ) : (
                                <div
                                  className={`submenu-link ${currentPath === child.path ? 'active' : ''}`}
                                  onClick={() => handleItemClick(index, child?.path)}
                                >
                                  <div className="submenu-dot"></div>
                                  <span className="nav-text">{t(child.key)}</span>
                                </div>
                              )}
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
            <div className="footer-year">© {dayjs().year()} KPI Dashboard</div>
          </div>
        </div>
      </div>
    </StyledSitebar>
  );
}
