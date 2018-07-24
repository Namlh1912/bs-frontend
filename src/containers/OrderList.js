import React from 'react';
import fuse from 'fuse.js';
import moment from 'moment';
import { Table, Layout, Button, Badge, Dropdown, Menu, Icon } from 'antd';
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
class OrderList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			searchText : '',
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
		title: 'Order No.',
		dataIndex: 'orderCode',
		sorter: (a, b) => a.username.localeCompare(b.username),
		render: (text, record) => (
			<span>
				<a role="button"
					 onClick={() => {}}
					 style={{ marginRight: 8 }}
				>
					{this.renderColumnText(text)}
				</a>
    </span>
		),
	}, {
		title: 'Username',
		dataIndex: 'customer',
		sorter: (a, b) => a.customer.localeCompare(b.customer),
		render: (text) => this.renderColumnText(text),
	}, {
		title: 'Date',
		dataIndex: 'orderDate',
		sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
		render: (text, record) => (
			<div>{moment(text).format('DD/MM/YYYY hh:mm')}</div>
		)
	},{
		title: 'Item Count',
		dataIndex: 'details',
		sorter: (a, b) => a.mobile.localeCompare(b.mobile),
		render: (text, record) => (
			<div>{record.details.length}</div>
		)
	}];

	componentDidMount() {
		this.props.getOrderList();
	}

	handleSearch = (text) => {
		this.setState({
			searchText: text,
		})
	}

	expandedRowRender = (record) => {
		const columns = [
			{ title: 'Item', dataIndex: 'productName', key: 'productName', render: (text) => this.renderColumnText(text), },
			{ title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
			{ title: 'Total', dataIndex: 'totalPrice', key: 'totalPrice' },
		];

		return (
			<Table
				showHeader={false}
				columns={columns}
				dataSource={record.details}
				pagination={false}
			/>
		);
	};

	render(){
		let searchedData = this.props.orders;
		if (this.state.searchText.length > 0) {
			var options = {
				keys: ['username', 'orderCode', 'details.productName'],
				threshold: 0.1,
			};
			var f = new fuse(this.props.orders, options)
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
					dataSource={searchedData}
					pagination={false}
					expandedRowRender={this.expandedRowRender}
				/>
			</Content>
		);
	}
}

export default withRouter(OrderList);