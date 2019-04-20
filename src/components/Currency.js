import React, { Component } from 'react';

class Currency extends Component {
  
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
        masterData.push({currency: country.currencies[0].code})
        return country
      })

      this.setState({ country: masterData })
    })
  }

  onChangeHandler = (event) => {
    this.props.onChangeCurrency(event.target.options[event.target.selectedIndex].value)
  }

  render() {
    return (
      <div>
        Currency
        <select  
          value={this.props.defVal}
          name="currency_input"
          onChange={this.onChangeHandler} 
        >
          { this.state.country.map((item, i) => (
                  <option key={i} value={item.currency}>{ item.currency }</option>
          )) }
        </select>
      </div>
    )
  }

}

export default Currency