import React from 'react';
import { Table, Input, Button, Modal, Menu, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import books from '../mock/mock-book';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Title',
  dataIndex: 'title',
  sorter: (a, b) => {
    if(a.title < b.title) return -1;
    if(a.title > b.title) return 1;
    return 0;
  },
}, {
  title: 'Type',
  dataIndex: 'type',
  sorter: (a, b) => {
    if(a.type < b.type) return -1;
    if(a.type > b.type) return 1;
    return 0;
  },
},{
  title: 'Publisher',
  dataIndex: 'publisher',
  sorter: (a, b) => {
    if(a.publisher < b.publisher) return -1;
    if(a.publisher > b.publisher) return 1;
    return 0;
  },
}, {
  title: 'Author',
  dataIndex: 'author',
  sorter: (a, b) => {
    if(a.author < b.author) return -1;
    if(a.author > b.author) return 1;
    return 0;
  },
}, {
  title: 'Price',
  dataIndex: 'price',
  sorter: (a, b) => {
    if(a.price < b.price) return -1;
    if(a.price > b.price) return 1;
    return 0;
  },
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">Delete</a>
    </span>
  ),
}];


class UserList extends React.Component{
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

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
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
      <div className="flex-home">
        <div className="sub-menu">
          <Button onClick={this.toggleCollapsed}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </div>
        <div className="main-menu">
          <div className="header-container">
            <Button type="primary" onClick={this.showModal}>
              Add new book
            </Button>
            <Modal
              visible={visible}
              title="Title"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>Return</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                  Submit
                </Button>,
              ]}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>

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
            dataSource={books} />
        </div>

      </div>
    );
  }
}

export default UserList;