import React, { Component } from 'react';
import './App.css';
import ProductItem from './components/ProductItem';
import AddProduct from './components/AddProduct';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

import Chart from "devextreme-react/chart";
import dataSource from './data.js';

const accounts = [
  {
    accountHolderName: 'cx100',
    accountNumber: 101,
    swiftCode: 202,
    address: 'jalan merbabu',
    city: 'surabaya',
    country: 'IDN',
    currency: 'idr',
    type: 1, // individual | company
    firstname: 'indro',
    lastname: 'allezz',
    company: ''
  },
  {
    accountHolderName: 'dm34',
    accountNumber: 212,
    swiftCode: 219,
    address: 'jalan terang bulan',
    city: 'malang',
    country: 'FJI',
    currency: 'idr',
    type: 2, // individual | company
    firstname: '',
    lastname: '',
    company: 'jet corp'
  },
  {
    accountHolderName: 'zx01',
    accountNumber: 444,
    swiftCode: 145,
    address: 'jalan akal sehat',
    city: 'jember',
    country: 'HUN',
    currency: 'idr',
    type: 2, // individual | company
    firstname: '',
    lastname: '',
    company: 'zx corp'
  },
]

localStorage.setItem('accounts', JSON.stringify(accounts))

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      accounts: JSON.parse(localStorage.getItem('accounts')),
      commonSeriesSettings: {
        argumentField: "date",
        type: "stock"
      },
      series: [
        {
            name: "DELL",
            openValueField: "o", 
            highValueField: "h", 
            lowValueField: "l", 
            closeValueField: "c", 
            reduction: {
                color: "red"
            }
        }
      ],
      valueAxis: {
        tickInterval: 1,
        title: { 
            text: "US dollars"
        },
        label: {
            format: {
                type: "currency",
                precision: 0
            }
        }
      },
      argumentAxis: {
        workdaysOnly: true,
        label: {
            format: "shortDate"
        }
      },
      tooltip: {
        enabled: true,
        location: "edge",
        customizeTooltip: function (arg) {
            return {
                text: "Open: $" + arg.openValue + "<br/>" +
                        "Close: $" + arg.closeValue + "<br/>" +
                        "High: $" + arg.highValue + "<br/>" +
                        "Low: $" + arg.lowValue + "<br/>"
            };
        }
      }
    };
  }

  componentWillMount() {
    const accounts = this.getAccounts()
    this.setState({ accounts });
  }

  getAccounts() {
    return this.state.accounts
  }

  onDelete = (accNumber) => {
    const accounts = this.getAccounts()
    const filteredAccounts = accounts.filter(account => {
      return account.accountNumber !== accNumber
    })

    this.setState({ accounts: filteredAccounts })
  }

  onAdd = (data) => {
    const accounts = this.getAccounts()

    accounts.push(data)

    this.setState({ accounts })
  }

  onEditSubmit = (data, originalAccNum) => {
    let accounts = this.getAccounts()

    accounts = accounts.map(account => {
      if (account.accountNumber === originalAccNum) {
        account = data
      }
      return account
    })

    this.setState({ accounts })
  }

  render() {
    return (
      <div className="App">
        <h1>Bank Accounts Manager</h1>

        <AddProduct onAdd={this.onAdd} />
        {
          this.state.accounts.map((account, idx) => {
            return (
              <ProductItem key={idx} data={account} 
                onDelete={this.onDelete} 
                onEditSubmit={this.onEditSubmit}
              />
            )
          })
        }

        <React.Fragment>
          <Chart
            dataSource={ dataSource }
            title="Pizza Shop Complaints"
            commonSeriesSettings={this.state.commonSeriesSettings}
            series={this.state.series}
            valueAxis={this.state.valueAxis}
            argumentAxis={this.state.argumentAxis}
            tooltip={this.state.tooltip}
          >
          </Chart>
        </React.Fragment>

      </div>
    );
  }
}

export default App;
