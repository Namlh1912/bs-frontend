import React from 'react';
import { Button } from 'antd';
import {Input} from "antd/lib/index";

const Search = Input.Search;

class ActionBar extends React.Component {
	render() {
		return (
			<div style={{ marginBottom: 20 }}>
				{
					this.props.onNewButtonClicked
						?
							(
								<Button
									type="primary"
									icon="plus-circle-o"
									onClick={this.props.onNewButtonClicked}
								>
									New
								</Button>
							)
						: null
				}
				{
					this.props.onSearchChanged
					?
						(
							<Search
								placeholder="Search"
								onSearch={(text) => {this.props.onSearchChanged(text)}}
								onChange={(text) => {this.props.onSearchChanged(text.target.value)}}
								style={{ width: 200, float: 'right' }}
							/>
						)
					: null
				}
				{ this.props.children }
			</div>
		)
	}
}

export default ActionBar;