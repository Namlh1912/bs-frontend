import React from 'react';
import { Layout, Icon, Menu } from 'antd';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";

import '../styles/app.css';
import Header from '../components/Header';
import Login from '../containers/Login';
import BookList from '../containers/BookList';
import BookDetail from '../containers/BookDetail';
import UserList from '../containers/UserList';
import UserDetail from '../containers/UserDetail';
import OrderList from '../containers/OrderList';


const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@connect(
	state => ({
		token: state.me.token,
	}),
	null
)
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
					defaultOpenKeys={['1', '0']}
					>
					<Menu.Item key="/users">
						<Icon type="user" />
						<span>Users</span>
						<Link to="/users"/>
					</Menu.Item>
					<SubMenu key="1" title={<span><Icon type="book" /><span>Books</span></span>}>
						<Menu.Item key="/books/new">
							Add new
							<Link to="/books/new"/>
						</Menu.Item>
						<Menu.Item key="/books">
							List
							<Link to="/books"/>
						</Menu.Item>
					</SubMenu>

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
			this.props.token ?
				(
					<Layout style={{ minHeight: '100vh' }}>
						<Header />
						<Layout>
							{this.renderSideMenu()}
							<Switch>
								<Route path="/books/new" component={BookDetail}/>
								<Route path="/books/:id" component={BookDetail}/>
								<Route path="/books" component={BookList}/>


								<Route path='/orders' component={OrderList}/>
								<Route path="/orders/:id" component={BookList}/>

								<Route path="/users/:id" component={UserDetail}/>
								<Route path='/users' component={UserList}/>
							</Switch>
						</Layout>
					</Layout>
				) :
				(
					<Redirect push to={{
						pathname:'/',
					}} />
				)

		)



    return(
    	<Default/>
    )
  }
}

export default withRouter(Routes);



