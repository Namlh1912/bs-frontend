import React from 'react';
import { Icon, Menu, Layout } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {logout} from "../redux/actions/auth";

@connect(
	state => ({
		token: state.me.token,
    username: state.me.username,
	}),
  dispatch => ({
		handleLogout: bindActionCreators(logout, dispatch),
  })
)
class Header extends React.Component {
  render() {
    return (
			<Layout.Header className="header">
				<div className="logo" />
				<div className="title">Book Outlet</div>
        {
          this.props.username ?
            (
							<Menu
								mode="horizontal"
								style={{ lineHeight: '63px', float: 'right' }}
							>
								<Menu.SubMenu title={
									<span>
								    <Icon type="meh-o" />
                    {this.props.username}
                    <Icon type="caret-down" style={{ marginLeft: 10, fontSize: 8}}/>
                  </span>
								}>
									<Menu.Item key="log-out" onClick={this.props.handleLogout}>Log Out</Menu.Item>
								</Menu.SubMenu>
							</Menu>
            )
            : null
        }

			</Layout.Header>
    )
  }
}

export default Header;
