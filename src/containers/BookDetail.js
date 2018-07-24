import React from 'react';
import { Form, Input, Button, Row, Col, Layout, Icon } from 'antd';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {create, detail, update} from "../redux/actions/book";

const { Content} = Layout;

const FormItem = Form.Item;

@connect(
	state => ({
		loading: state.book.loading,
		current: state.book.current,
	}),
	dispatch => ({
		createBook: bindActionCreators(create, dispatch),
		updateBook: bindActionCreators(update, dispatch),
		detailBook: bindActionCreators(detail, dispatch),
	})
)
class BookDetail extends React.Component{
  constructor(props){
    super(props);

    // Check current mode
		let mode = 'New';
		if (this.props.match.params.hasOwnProperty('id')) {
			mode = 'Edit';
			this.props.detailBook(this.props.match.params.id);
		}

		// Initiate state
    this.state = {
      number: 0,
      loading: false,
			coverURL: '',
			mode,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.mode === 'New') {
					this.props.createBook(values);
				} else {
					this.props.updateBook(this.props.match.params.id, values);
				}
      }
    });
  }

  handleCancel = () => {
		this.props.history.push('/books')
  }

	handleBookCoverChange = (e) => {
		this.setState({
			coverURL: e.target.value,
		});
	}

	renderForm = () => {
		const { getFieldDecorator } = this.props.form;
  	return (
			<Form layout="vertical" loading={this.props.loading}>
				<FormItem
					label="Book Cover"
				>
					{getFieldDecorator('imageUrl', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.imageUrl : '',
					})(
						<Input
							addonAfter={<Icon type="link" />}
							placeholder="Book cover URL"
							onChange={this.handleBookCoverChange}
						/>
					)}
				</FormItem>
				<FormItem
					label="Title"
				>
					{getFieldDecorator('title', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.title : '',
					})(
						<Input placeholder="Book title"/>
					)}
				</FormItem>

				<FormItem
					label="Category"
				>
					{getFieldDecorator('category', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.category : '',
					})(
						<Input placeholder="Book category"/>
					)}
				</FormItem>

				<FormItem
					label="Publisher"
				>
					{getFieldDecorator('publisher', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.publisher : '',
					})(
						<Input placeholder="Publisher name"/>
					)}
				</FormItem>

				<FormItem
					label="Author"
				>
					{getFieldDecorator('author', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.author : '',
					})(
						<Input placeholder="Author name"/>
					)}
				</FormItem>

				<FormItem
					label="Price"
				>
					{getFieldDecorator('price', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.price : '',
					})(
						<Input placeholder="0.0" addonAfter="USD"/>
					)}
				</FormItem>
			</Form>
		)
	}

  render() {
		console.log(this.props.match);
    return(
			<Content className="content">
        <ActionBar>
					<Button
						type="primary"
						icon="save"
						onClick={this.handleSubmit}
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
        <h2>{this.state.mode} Book</h2>
				<Row gutter={8} justify="center">
					<Col lg={6} md={8} sm={24} xs={24}>
						<div className="book-cover">
							<div
								className="image"
								style={{
									backgroundImage: `url(${this.props.current && this.state.coverURL === '' ? this.props.current.imageUrl : this.state.coverURL})`,
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center',
								}}>

							</div>
						</div>
					</Col>
					<Col lg={18} md={16} sm={24} xs={24}>
						{ this.renderForm() }
					</Col>
				</Row>
      </Content>
    )
  }
}

const WrappedBookDetail = Form.create()(BookDetail);
export default WrappedBookDetail;