import React from 'react';
import { Table, Layout, Modal } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {list, remove} from "../redux/actions/book";
import {connect} from "react-redux";

const { Content} = Layout;

@connect(
	state => ({
		books: state.book.list,
		loading: state.book.loading,
	}),
	dispatch => ({
		getBookList: bindActionCreators(list, dispatch),
		removeBook: bindActionCreators(remove, dispatch),
	})
)
class BookList extends React.Component{
	columns = [{
		title: 'Title',
		dataIndex: 'title',
		sorter: (a, b) => a.title.localeCompare(b.title),
		render: (text, record) => (
			<span>
				<a href="javascript:;"
					 onClick={() => this.props.history.push(`/books/${record.id}`, record)}
					 style={{ marginRight: 8 }}
				>
					{record.title}
				</a>
    </span>
		),
	}, {
		title: 'Category',
		width: 150,
		dataIndex: 'category',
		sorter: (a, b) => a.type.localeCompare(b.type),
	},{
		title: 'Publisher',
		dataIndex: 'publisher',
		sorter: (a, b) => a.publisher.localeCompare(b.publisher),
	}, {
		title: 'Author',
		dataIndex: 'author',
		sorter: (a, b) => a.author.localeCompare(b.author),
	}, {
		title: 'Price',
		dataIndex: 'price',
		width: 100,
		sorter: (a, b) => a.price - b.price,
	},{
		title: '',
		key: 'action',
		width: 80,
		render: (text, record) => (
			<span>
				<a href="javascript:;"
					 onClick={() => this.showConfirm(record.id, this.props.removeBook)}
					 style={{ marginRight: 8 }}
				>
					Delete
				</a>
    </span>
		),
	}];

  constructor(props){
    super(props);
  }

  componentDidMount() {
  	this.props.getBookList();
	}

	showConfirm = (id, handler) => {
		Modal.confirm({
			title: 'Do you Want to delete this book?',
			content: 'This action cannot be reverted',
			onOk() {
				handler(id, true);
			},
		});
	}


	handleSearch = (text) => {
  	console.log(text);
	}

	handleNew = () => {
		this.props.history.push('/books/new')
	}

  render(){
    return(
        <Content className="content">
					<ActionBar
						onNewButtonClicked={this.handleNew}
						onSearchChanged={this.handleSearch}
					/>
					<h2>Book List</h2>
					<Table
						loading={this.props.loading}
						rowKey={books => books.id}
						columns={this.columns}
						dataSource={this.props.books}
						pagination={false}
          />
        </Content>
    );
  }
}

export default withRouter(BookList);