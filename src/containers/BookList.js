import React from 'react';
import fuse from 'fuse.js';
import { Table, Layout, Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {list, remove} from "../redux/actions/book";
import {connect} from "react-redux";

const { Content} = Layout;

@connect(
	state => ({
		books: state.book.list,
		loading: state.book.isLoading,
	}),
	dispatch => ({
		getBookList: bindActionCreators(list, dispatch),
		removeBook: bindActionCreators(remove, dispatch),
	})
)
class BookList extends React.Component{
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
		title: '',
		dataIndex: 'imageUrl',
		render: (text, record) => (
			<div className="book-cover"  style={{width: 90, height: 120,}}>
				<div
					className="image"
					style={{
						backgroundImage: `url(${record.imageUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						padding: 3,
					}}>

				</div>
			</div>
		),
	}, {
		title: 'Title',
		dataIndex: 'title',
		sorter: (a, b) => a.title.localeCompare(b.title),
		render: (text, record) => (
			<span>
				<a role="button"
					 onClick={() => this.props.history.push(`/books/${record.id}`, record)}
					 style={{ marginRight: 8 }}
				>
					{this.renderColumnText(text)}
				</a>
    </span>
		),
	}, {
		title: 'Category',
		width: 150,
		dataIndex: 'category',
		sorter: (a, b) => a.type.localeCompare(b.type),
		render: (text) => this.renderColumnText(text),
	},{
		title: 'Publisher',
		dataIndex: 'publisher',
		sorter: (a, b) => a.publisher.localeCompare(b.publisher),
		render: (text) => this.renderColumnText(text),
	}, {
		title: 'Author',
		dataIndex: 'author',
		sorter: (a, b) => a.author.localeCompare(b.author),
		render: (text) => this.renderColumnText(text),
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
				<a role="button"
					 onClick={() => this.showConfirm(record.id, this.props.removeBook)}
					 style={{ marginRight: 8 }}
				>
					Delete
				</a>
    </span>
		),
	}];

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
  	this.setState({
			searchText: text,
		})
	}

	handleNew = () => {
		this.props.history.push('/books/new')
	}

  render(){
		let searchedData = this.props.books;
  	if (this.state.searchText.length > 0) {
			var options = {
				keys: ['title', 'category', 'publisher', 'author'],
				threshold: 0.1,
			};
			var f = new fuse(this.props.books, options)
			searchedData = f.search(this.state.searchText);
		}

    return(
        <Content className="content">
					<ActionBar
						onNewButtonClicked={this.handleNew}
						onSearchChanged={this.handleSearch}
					>
						<Button
							type="default"
							icon="reload"
							onClick={() => {this.props.getBookList();}}
							style={{marginLeft: 5}}
						>
							Reload
						</Button>
					</ActionBar>
					<h2>Book List</h2>
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

export default withRouter(BookList);