import React from 'react';
import { Form, Input, Button, Layout, Icon } from 'antd';
import ActionBar from '../components/ActionBar';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { detail } from "../redux/actions/user";

const { Content} = Layout;

const FormItem = Form.Item;

@connect(
	state => ({
		loading: state.user.isLoading,
		current: state.user.current,
	}),
	dispatch => ({
		detailUser: bindActionCreators(detail, dispatch),
	})
)
class UserDetail extends React.Component{
	constructor(props){
		super(props);

		// Check current mode
		let mode = 'View';
		this.props.detailUser(this.props.match.params.id);

		// Initiate state
		this.state = {
			mode,
		}
	}

	handleCancel = () => {
		this.props.history.push('/users')
	}

	renderForm = () => {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout="vertical" hideRequiredMark>
				<FormItem
					label="Username"
				>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.username : '',
					})(
						<Input
							addonAfter={<Icon type="user" />}
							placeholder="Book cover URL"
							disabled
						/>
					)}
				</FormItem>
				<FormItem
					label="Email"
				>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.email : '',
					})(
						<Input placeholder="Email" disabled/>
					)}
				</FormItem>

				<FormItem
					label="Mobile"
				>
					{getFieldDecorator('mobile', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.mobile : '',
					})(
						<Input placeholder="Mobile" disabled/>
					)}
				</FormItem>

				<FormItem
					label="Address"
				>
					{getFieldDecorator('address', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.address : '',
					})(
						<Input placeholder="Address" disabled/>
					)}
				</FormItem>

				<FormItem
					label="Role"
				>
					{getFieldDecorator('role', {
						rules: [{ required: true, message: 'This field is required' }],
						initialValue: this.props.current ? this.props.current.role : '',
					})(
						<Input placeholder="Role" disabled/>
					)}
				</FormItem>

			</Form>
		)
	}

	render() {
		return(
			<Content className="content">
				<ActionBar>
					<Button
						type="default"
						icon="close"
						onClick={this.handleCancel}
						style={{marginLeft: 5}}
					>
						Cancel
					</Button>

				</ActionBar>
				<h2>{this.state.mode} User</h2>
				{ this.renderForm() }
			</Content>
		)
	}
}

const WrappedUserDetail = Form.create()(UserDetail);
export default WrappedUserDetail;