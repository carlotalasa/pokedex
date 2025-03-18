import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="navbar-header">
      <div className="navbar-title">
        Pokédex
      </div>
      <Menu theme="light" mode="horizontal" className="navbar-menu">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="favorites">
          <Link to="/favorites">Favorites</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;