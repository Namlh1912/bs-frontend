import React from 'react';
import books from '../mock/mock-book';
import { Form, Input, Button, InputNumber, Upload, Icon, Modal } from 'antd';

const FormItem = Form.Item;

class BookDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      number: 0,
      loading: false,
      previewVisible: false,
      previewImage: '',

    }
  }

  componentDidMount() {
   console.log( 'A Redirect should never update.');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  editableForm = (data) =>{
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };
    return(
      data.map(item => (
        <Form key={item.id} onSubmit={this.handleSubmit}>
          <FormItem
            label="Tittle"
            {...formItemLayout}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your title!' }],
              initialValue:item.title
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="Type"
            {...formItemLayout}
          >
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'Please input your type!' }],
              initialValue:item.type
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="Publisher"
            {...formItemLayout}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your publisher!' }],
              initialValue:item.publisher
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="Author"
            {...formItemLayout}
          >
            {getFieldDecorator('author', {
              rules: [{ required: true, message: 'Please input your author!' }],
              initialValue:item.author
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Price"
          >
            {getFieldDecorator('input-number', { initialValue: item.price })(
              <InputNumber min={0} max={1000} />
            )}
            <span className="ant-form-text"> $</span>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      ))
    )
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file }) => this.setState({ file })

  render(){
    const currentId = this.props.location.state.id;
    const currentItem = books.filter(item => item.id === currentId);
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <div>
        Edit Book
        <div className="left-side-book-detail">

        </div>
        <div className="right-side-book-detail">
          { this.editableForm(currentItem) }

        </div>
      </div>
    )
  }
}

export default BookDetail;