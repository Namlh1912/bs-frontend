import React from 'react';
import books from '../mock/mock-book';
import { Form, Input, Button, InputNumber, Upload, Icon, Modal, Layout } from 'antd';
import ActionBar from '../components/ActionBar';

const { Content} = Layout;

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleCancel = () => {
		this.props.history.push('/books')
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file }) => this.setState({ file })

	normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}

  render() {
		console.log(this.props.match);
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 18 },
			},
		};
    return(
			<Content className="content">
        <ActionBar>
					<Button
						type="primary"
						icon="save"
					>
						Save
					</Button>
					<Button
						type="default"
						icon="close"
						onClick={this.handleCancel}
            style={{marginLeft: 5}}
					>
						Cancel
					</Button>
        </ActionBar>
        <h2>New Book</h2>
        <Form>
					<FormItem
						{...formItemLayout}
						label="Upload"
						extra="Upload book cover image"
					>
						{getFieldDecorator('upload', {
							valuePropName: 'fileList',
							getValueFromEvent: this.normFile,
						})(
							<Upload name="logo" action="/upload.do" listType="picture">
								<Button>
									<Icon type="upload" /> Click to upload
								</Button>
							</Upload>
						)}
					</FormItem>
					<FormItem
						label="Title"
						{...formItemLayout}
					>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Please input your title!' }],
						})(
							<Input placeholder="Title"/>
						)}
					</FormItem>

					<FormItem
						label="Type"
						{...formItemLayout}
					>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Please input your title!' }],
							initialValue:"asd"
						})(
							<Input/>
						)}
					</FormItem>

					<FormItem
						label="Publisher"
						{...formItemLayout}
					>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Please input your title!' }],
							initialValue:"asd"
						})(
							<Input/>
						)}
					</FormItem>

					<FormItem
						label="Author"
						{...formItemLayout}
					>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Please input your title!' }],
							initialValue:"asd"
						})(
							<Input/>
						)}
					</FormItem>

					<FormItem
						label="Price"
						{...formItemLayout}
					>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Please input your title!' }],
							initialValue:"asd"
						})(
							<Input/>
						)}
					</FormItem>
        </Form>
      </Content>
    )
  }
}

const WrappedBookDetail = Form.create()(BookDetail);
export default WrappedBookDetail;