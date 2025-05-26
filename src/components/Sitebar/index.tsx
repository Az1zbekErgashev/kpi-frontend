import { ChevronLeft, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StyledSitebar } from './style';

interface props {
  handleChangeCollapse: () => void;
  isCollapsed: boolean;
}
export function Sitebar({ handleChangeCollapse, isCollapsed }: props) {
  return (
    <StyledSitebar>
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="logo">
          <h2>KPI</h2>
          <button className="toggleButton" onClick={handleChangeCollapse}>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="navigation">
          <ul>
            <li>
              <Link to="/dashboard" className="active">
                <LayoutDashboard />
                <span className="linkText">Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebarFooter">
          <p>© 2025 KPI Dashboard</p>
        </div>
      </div>
    </StyledSitebar>
  );
}
