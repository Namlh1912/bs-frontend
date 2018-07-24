import React from 'react';
import { Table, Layout } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {list} from "../redux/actions/book";
import {connect} from "react-redux";

const { Content} = Layout;

const columns = [{
  title: 'Title',
  dataIndex: 'title',
  sorter: (a, b) => a.title.localeCompare(b.title),
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
      <a href="">Delete</a>
    </span>
  ),
}];

@connect(
	state => ({
		books: state.book.list,
		loading: state.book.loading,
	}),
	dispatch => ({
		getBookList: bindActionCreators(list, dispatch),
	})
)
class BookList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      redirect:false,
      currentId: 0,
      value:'',
      collapsed: false,
    }
  }

  componentDidMount() {
  	this.props.getBookList();
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
						onRow={(record) => {
							return {
								onClick: () => {
									this.props.history.push(`/books/${record.id}`, record)
								},
							};
						}}
						rowKey={books => books.id}
						columns={columns}
						dataSource={this.props.books}
						pagination={false}
          />
        </Content>
    );
  }
}

export default withRouter(BookList);