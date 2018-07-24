import fuse from 'fuse.js';
import React from 'react';
import { Table, Layout, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {list} from "../redux/actions/user";
import {connect} from "react-redux";

const { Content} = Layout;

@connect(
	state => ({
		users: state.user.list,
		loading: state.user.isLoading,
	}),
	dispatch => ({
		getUserList: bindActionCreators(list, dispatch),
	})
)
class UserList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			searchText : '',
			searchedData: null,
		}
	}

	renderColumnText = (text) => {
		const {searchText} = this.state;
		return searchText && text ? (
			<span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
							fragment.toLowerCase() === searchText.toLowerCase()
								? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
						))}
          </span>
		) : text;
	}

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
					{this.renderColumnText(text)}
				</a>
    </span>
		),
	}, {
		title: 'Email',
		dataIndex: 'email',
		sorter: (a, b) => a.email.localeCompare(b.email),
		render: (text) => this.renderColumnText(text),
	},{
		title: 'Mobile',
		dataIndex: 'mobile',
		sorter: (a, b) => a.mobile.localeCompare(b.mobile),
		render: (text) => this.renderColumnText(text),
	}, {
		title: 'Address',
		dataIndex: 'address',
		sorter: (a, b) => a.address.localeCompare(b.address),
		render: (text) => this.renderColumnText(text),
	}, {
		title: 'Role',
		dataIndex: 'roleTitle',
		sorter: (a, b) => a.roleTitle.localeCompare(b.roleTitle),
		render: (text) => this.renderColumnText(text),
	}];

	componentDidMount() {
		this.props.getUserList();
	}

	handleSearch = (text) => {
		this.setState({
			searchText: text,
		})
	}

	render(){
		let searchedData = this.props.users;
		if (this.state.searchText.length > 0) {
			var options = {
				keys: ['email', 'username', 'mobile', 'address'],
				threshold: 0.2,
			};
			var f = new fuse(this.props.users, options)
			searchedData = f.search(this.state.searchText);
		}

		return(
			<Content className="content">
				<ActionBar
					onSearchChanged={this.handleSearch}
				>
					<Button
						type="default"
						icon="reload"
						onClick={() => {this.props.getUserList();}}
						style={{marginLeft: 5}}
					>
						Reload
					</Button>
				</ActionBar>
				<h2>User List</h2>
				<Table
					loading={this.props.loading}
					rowKey={books => books.id}
					columns={this.columns}
					dataSource={searchedData}
					pagination={false}
				/>
			</Content>
		);
	}
}

export default withRouter(UserList);