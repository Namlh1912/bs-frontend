import React from 'react';
import { Table, Layout, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {list} from "../redux/actions/order";
import {connect} from "react-redux";

const { Content} = Layout;

@connect(
	state => ({
		orders: state.order.list,
		loading: state.order.isLoading,
	}),
	dispatch => ({
		getOrderList: bindActionCreators(list, dispatch),
	})
)
class UserList extends React.Component{
	columns = [{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: 'Username',
		dataIndex: 'username',
		sorter: (a, b) => a.username.localeCompare(b.username),
		render: (text, record) => (
			<span>
				<a role="button"
					 onClick={() => this.props.history.push(`/users/${record.id}`, record)}
					 style={{ marginRight: 8 }}
				>
					{record.username}
				</a>
    </span>
		),
	}, {
		title: 'Email',
		dataIndex: 'email',
		sorter: (a, b) => a.email.localeCompare(b.email),
	},{
		title: 'Mobile',
		dataIndex: 'mobile',
		sorter: (a, b) => a.mobile.localeCompare(b.mobile),
	}, {
		title: 'Address',
		dataIndex: 'address',
		sorter: (a, b) => a.address.localeCompare(b.address),
	}, {
		title: 'Role',
		dataIndex: 'roleTitle',
		sorter: (a, b) => a.roleTitle.localeCompare(b.roleTitle),
	}];

	componentDidMount() {
		this.props.getOrderList();
	}

	handleSearch = (text) => {
		console.log(text);
	}

	render(){
		return(
			<Content className="content">
				<ActionBar
					onSearchChanged={this.handleSearch}
				>
					<Button
						type="default"
						icon="reload"
						onClick={() => {this.props.getOrderList();}}
						style={{marginLeft: 5}}
					>
						Reload
					</Button>
				</ActionBar>
				<h2>Order List</h2>
				<Table
					loading={this.props.loading}
					rowKey={books => books.id}
					columns={this.columns}
					dataSource={this.props.orders}
					pagination={false}
				/>
			</Content>
		);
	}
}

export default withRouter(UserList);