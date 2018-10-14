import React, {Component} from 'react';

export default class AddProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            companyName: '',
            remittanceStreet: '',
            remittanceCity: '',
            remittanceState: '',
            remittanceZipCode: ''
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleCompanyName = this.handleCompanyName.bind(this);
        this.handleRemittanceStreet = this.handleRemittanceStreet.bind(this);
        this.handleRemittanceCity = this.handleRemittanceCity.bind(this);
        this.handleRemittanceState = this.handleRemittanceState.bind(this);
        this.handleRemittanceZipCode = this.handleRemittanceZipCode.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleCompanyName(e) {
        this.setState({
            companyName: e.target.value
        });
    }

    handleRemittanceStreet(e) {
        this.setState({
            remittanceStreet: e.target.value
        });
    }

    handleRemittanceCity(e) {
        this.setState({
            remittanceCity: e.target.value
        });
    }

    handleRemittanceState(e) {
        this.setState({
            remittanceState: e.target.value
        });
    }

    handleRemittanceZipCode(e) {
        this.setState({
            remittanceZipCode: e.target.value
        });
    }


    handleOnClick(e) {
        let newProfile = {
            email: this.state.email,
            password: this.state.password,
            companyName: this.state.companyName,
            remittanceStreet: this.state.remittanceStreet,
            remittanceCity: this.state.remittanceCity,
            remittanceState: this.state.remittanceState,
            remittanceZipCode: this.state.remittanceZipCode
        };

        this.props.addUser(newProfile);
    }

    render() {
        return (
            <div>
            <p>Add a new profile</p>
        <input onChange={this.handleEmail} value={this.state.email} />
        <input onChange={this.handlePassword} value={this.state.password} />
        <input onChange={this.handleCompanyName} value={this.state.companyName} />
        <input onChange={this.handleRemittanceStreet} value={this.state.remittanceStreet} />
        <input onChange={this.handleRemittanceCity} value={this.state.remittanceCity} />
        <button onClick={this.handleOnClick}>Add</button>
        </div>
    );
    }
}