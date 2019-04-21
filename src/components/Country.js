import React, { Component } from 'react';

class Country extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      country: []
    }
  }

  componentWillMount() {
    let masterData = []
    
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(result => {
      result.map(country => {
        masterData.push({id: country.alpha3Code, name: country.name, currency: country.currencies[0].code})
        return country
      })

      this.setState({ country: masterData })
    })
  }

  onChangeHandler = (event) => {
    const countryValue = event.target.options[event.target.selectedIndex].value
    let country = this.state.country.find(country => country.id === countryValue)
    this.props.onChangeCountry(country.id)
    this.props.onChangeCurrency(country.currency)
  }

  render() {
    return (
      <div className="form_element">
        <label>Country</label>
        <select  
          value={this.props.defVal}
          name="country_input"
          onChange={this.onChangeHandler} 
        >
          { this.state.country.map((item, i) => (
                  <option key={i} value={item.id}>{ item.name } - { item.currency }</option>
          )) }
        </select>
      </div>
    )
  }

}

export default Country
