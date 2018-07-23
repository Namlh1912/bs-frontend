import React from 'react';
import { Table, Input, Button, Layout } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import ActionBar from '../components/ActionBar';
import books from '../mock/mock-book';

const { Content} = Layout;

const Search = Input.Search;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
	sorter: (a, b) => a.id - b.id,
}, {
  title: 'Title',
  dataIndex: 'title',
  sorter: (a, b) => a.title.localeCompare(b.title),
}, {
  title: 'Type',
  dataIndex: 'type',
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
  sorter: (a, b) => a.price - b.price,
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">Delete</a>
    </span>
  ),
}];


class BookList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      redirect:false,
      currentId: 0,
      value:'',
      loading: false,
      visible: false,
      collapsed: false,
    }
  }

  onSearch = (text) => {
  	console.log(text);
	}

	onNew = () => {
		this.props.history.push('/books/new')
	}

  render(){
    const { visible, loading } = this.state;
    if (this.state.redirect) {
      return <Redirect push to={{
        pathname:`/book/${this.state.currentId}`,
        state: { id: this.state.currentId }
      }} />;
    }
    return(
        <Content className="content">
					<ActionBar
						onNewButtonClicked={this.onNew}
						onSearchChanged={this.onSearch}
					/>
					<Table
						onRow={(record) => {
							return {
								onClick: () => {
									this.setState({redirect:true, currentId: record.id});
								},
							};
						}}
						rowKey={books => books.id}
						columns={columns}
						dataSource={books}
						pagination={false}
          />
        </Content>
    );
  }
}

export default withRouter(BookList);