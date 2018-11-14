import React, { Component } from 'react';

class AltMap extends Component {
	state = {
		showInitial: false,
		timeOutId: null
	};
	
	showErrorMsg = () => {
		this.setState({
			showInitial: true 
		});
	}

	componentDidMount() {
		const id = window.setTimeout(
			this.showErrorMsg()
		, 500);

		this.setState({ 
			timeOutId: id
		});
	}

	componentWillUnmount() {
		window.clearTimeout(this.state.timeOutId);
	}

	render() {
		const { showInitial } = this.state;

		return (
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center'
			}}>
				{showInitial ?
					<div>
						<h3>Error:</h3>
						<p>Google Maps Failed to Load.</p>
					</div>
				: 
					<div>
						<p>Loading in Progress...</p>
					</div>
				}
			</div>	
 
		)
	}
}
export default AltMap;