import React, { Component } from 'react';

import FormFields from '../widgets/forms/formFields'
import Country from './Country'

const formDataTemplate = {
  accountHolderName: {
    element: 'input',
    value: '',
    label: false,
    labelText: 'Account Holder Name',
    config: {
      name: 'accountHolderName_input',
      type: 'text',
      placeholder: 'Account Holder Name'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMesage: ''
  },
  accountNumber: {
    element: 'input',
    value: '',
    label: false,
    labelText: 'Account Number',
    config: {
      name: 'accountNumber_input',
      type: 'text',
      placeholder: 'Account Number'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMesage: ''
  },
  swiftCode: {
    element: 'input',
    value: '',
    label: false,
    labelText: 'Swift Code',
    config: {
      name: 'swiftCode_input',
      type: 'text',
      placeholder: 'Swift Code'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMesage: ''
  },
  address: {
    element: 'input',
    value: '',
    label: false,
    labelText: 'Address',
    config: {
      name: 'address_input',
      type: 'text',
      placeholder: 'Address'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMesage: ''
  },
  city: {
    element: 'input',
    value: '',
    label: false,
    labelText: 'City',
    config: {
      name: 'city_input',
      type: 'text',
      placeholder: 'City'
    },
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    validationMesage: ''
  },
  type: {
    element: 'select',
    value: 1,  // individual: 1 | company: 2
    label: true,
    labelText: 'Type',
    config: {
      name: 'type_input',
      options: [
        { val: 1, text: 'Individual' },
        { val: 2, text: 'Company' }
      ]
    },
    validation: {
      required: true
    },
    valid: true,
    touched: false,
    validationMesage: ''
  }
}

const firstname = {
  element: 'input',
  value: '',  // individual: 1 | company: 2
  label: false,
  labelText: 'Firstname',
  config: {
    name: 'firstname_input',
    type: 'text',
    placeholder: 'Fristname'
  },
  validation: {
    required: true
  },
  valid: true,
  touched: false,
  validationMesage: ''
}

const lastname = {
  element: 'input',
  value: '',  // individual: 1 | company: 2
  label: false,
  labelText: 'Lastname',
  config: {
    name: 'lastname_input',
    type: 'text',
    placeholder: 'Lastname'
  },
  validation: {
    required: true
  },
  valid: true,
  touched: false,
  validationMesage: ''
}

const company = {
  element: 'input',
  value: '',  // individual: 1 | company: 2
  label: false,
  labelText: 'Company',
  config: {
    name: 'company_input',
    type: 'text',
    placeholder: 'Company'
  },
  validation: {
    required: true
  },
  valid: true,
  touched: false,
  validationMesage: ''
}

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: Object.assign({}, formDataTemplate),
      country: 'IDN',
      currency: ''
    }
  }

  updateForm = (newState) => {
    if (parseInt(newState.type.value) === 2) {
      newState.company = company
      delete newState.firstname
      delete newState.lastname
    } else if (parseInt(newState.type.value) === 1) {
      newState.firstname = firstname
      newState.lastname = lastname
      delete newState.company
    }
    this.setState({ formData: newState })
  }

  onSubmit = (event) => {
    event.preventDefault();
    let dataToSubmit = {}
    let formIsValid = true

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value
      formIsValid = this.state.formData[key].valid && formIsValid
    }

    dataToSubmit['country'] = this.state.country
    dataToSubmit['currency'] = this.state.currency

    // when valid save data
    if (formIsValid) {
      this.props.onAdd(dataToSubmit)
    } else {
      alert('invalid')
    }

    // reset state
    // this.setState({ formData: Object.assign({}, formDataTemplate) })
  }

  onChangeCountry = (country) => {
    this.setState({ country })
  }

  onChangeCurrency = (currency) => {
    this.setState({ currency })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Add an Account</h3>
        <FormFields formData={this.state.formData} change={ (newState) => this.updateForm(newState) } />
        <Country defVal={this.state.country} onChangeCountry={this.onChangeCountry} onChangeCurrency={this.onChangeCurrency} />
        <button>Submit</button>
    </form>
    )
  }
}

export default AddProduct;
