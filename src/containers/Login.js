import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login} from "../redux/actions/auth";
import { Form, Icon, Input, Button, Checkbox, Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

const FormItem = Form.Item;

@connect(
	state => ({
		token: state.me.token,
		loading: state.me.loading,
	}),
	dispatch => ({
		handleLogin: bindActionCreators(login, dispatch),
	})
)
class Login extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.props.handleLogin(values.username, values.password);
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
				this.props.token ?
				(
					<Redirect push to={{
						pathname:'/books',
					}} />
				)
				:
				(
					<Layout className="login-layout">
						<Header/>
						<Layout.Content className="login-content">
							<h1><b>Log</b> In</h1>
							<h2>Administrator Portal</h2>
							<Form onSubmit={this.handleSubmit} className="login-form">
								<FormItem>
									{getFieldDecorator('username', {
										rules: [{ required: true, message: 'Please input your username!' }],
									})(
										<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator('password', {
										rules: [{ required: true, message: 'Please input your Password!' }],
									})(
										<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
									)}
								</FormItem>
								<FormItem>
									{getFieldDecorator('remember', {
										valuePropName: 'checked',
										initialValue: true,
									})(
										<Checkbox>Remember me</Checkbox>
									)}
									<a className="login-form-forgot" href="">Forgot password</a>
									<Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.loading}>
										Log in
									</Button>
								</FormItem>
							</Form>
						</Layout.Content>
					</Layout>
				)
			)
		;
	}
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;