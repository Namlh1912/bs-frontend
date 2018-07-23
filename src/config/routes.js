import React, { PureComponent } from 'react';
import { Layout, Icon, Menu } from 'antd';
import {ToastContainer} from 'react-toastify';
import { Route, Switch, withRouter, Link } from 'react-router-dom';

import '../styles/app.css';
import Login from '../containers/Login';
import Home from '../containers/BookList';
import Order from '../containers/Order';
import User from '../containers/User';
import OrderDetail from '../containers/OrderDetail';
import UserDetail from '../containers/UserDetail';
import BookDetail from '../containers/BookDetail';

const { Header, Sider, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Routes extends React.Component {
	state = {
		collapsed: false,
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	renderSideMenu = () => {
		const { location } = this.props;
		return (
			<Sider
				theme={"light"}
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				<Menu
					theme={"light"}
					mode="inline"
					defaultSelectedKeys={[location.pathname]}
					>
					<Menu.Item key="/users">
						<Icon type="user" />
						<span>Users</span>
						<Link to="/users"/>
					</Menu.Item>
					<Menu.Item key="/books">
						<Icon type="book" />
						<span>Books</span>
						<Link to="/books"/>
					</Menu.Item>
					<Menu.Item key="/orders">
						<Icon type="shopping-cart" />
						<span>Orders</span>
						<Link to="/orders"/>
					</Menu.Item>
				</Menu>
			</Sider>
		)
	};

  render(){
    const Default = () => (
      <Switch>
        <Route exact path='/' component={Login} />
				<Route path='/login' component={Login} />

				<Route component={Authenticated}/>
      </Switch>
    )

		const Authenticated = () => (
			<Layout style={{ minHeight: '100vh' }}>
				<Header className="header">
					<div className="logo" />
					<div className="title">Book Outlet Admin</div>
					<Menu
						onClick={this.handleClick}
						selectedKeys={[this.state.current]}
						mode="horizontal"
						style={{ lineHeight: '63px', float: 'right' }}
					>
						<SubMenu title={
							<span>
								<Icon type="meh-o" />
								Nam Le
								<Icon type="caret-down" style={{ marginLeft: 10, fontSize: 8}}/>
							</span>
						}>
							<Menu.Item key="log-out">Log Out</Menu.Item>
						</SubMenu>
					</Menu>
				</Header>
				<Layout>
					{this.renderSideMenu()}
					<Switch>
						<Route exact path='/home' component={Home} />

						<Route path="/books/new" component={BookDetail}/>
						<Route path="/books/:id" component={Home}/>
						<Route path="/books" component={Home}/>


						<Route path='/orders' component={Order}/>
						<Route path="/orders/:id" component={Home}/>

						<Route path='/users' component={User}/>
						<Route path="/users/:id" component={Home}/>
					</Switch>
				</Layout>
			</Layout>
		)



    return(
    	<Default/>
    )
  }
}

export default withRouter(Routes);



