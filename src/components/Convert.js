import React, { Component } from 'react';
import {Button, View} from 'react-native';
import {ContractFactory, utils, providers} from 'ethers';
import oof_abi from './smart_contracts/OOFAbi'; 
import oof_bytecode from './smart_contracts/OOFBytecode';  
require('dotenv').config();


class Convert extends Component {


  async convertToOnes () {

    await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner()
    const signersAddress = await signer.getAddress()
    console.log("Account:", signersAddress);

    const number = utils.parseUnits(this.state.amount, 18)

    const oof = new ContractFactory(oof_abi(), oof_bytecode(), signer).attach("0x93B797c488e1541332762e1480b943F94D28D851")
    await oof.convert_to_ones(signersAddress, number);
  }


  async convertToFives () {

    await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner()
    const signersAddress = await signer.getAddress()
    console.log("Account:", signersAddress);

    const number = utils.parseUnits(this.state.amount, 18)

    const oof = new ContractFactory(oof_abi(), oof_bytecode(), signer).attach("0x93B797c488e1541332762e1480b943F94D28D851")
    await oof.convert_to_fives(signersAddress, number);
  }

  constructor(props) 
  {
    super(props)
    this.state = 
    {
      amount: null,
    }
    this.convertToOnes = this.convertToOnes.bind(this)
    this.convertToFives = this.convertToFives.bind(this)
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>Convert OOF</h1>

      <h8></h8>
      <Button
      title="Home Page"
      onPress={() => this.props.navigation.navigate('Home')}
      />

    <form onSubmit={(event) => {
      event.preventDefault()
      const temp_amount = this.amount.value
      this.setState({
        amount: temp_amount,
      })
      this.convertToOnes()
    }}>


    <div className="form-group mr-sm-2">

    <div className="form-group mr-sm-2"></div>
    <input
      id= 'amount'   
      type="text"
      className="form-control-sm"
      placeholder="Convert to Ones"
      required
      ref={(input) => {this.amount = input}}
    />


    <div className="form-group mr-sm-2"></div>
    <input
      type='submit'
      className='btn btn-block btn-primary'
      value='Convert to Ones'
    />
    </div></form>   


    <form onSubmit={(event) => {
      event.preventDefault()
      const temp_amount = this.amount.value
      this.setState({
        amount: temp_amount,
      })
      this.convertToFives()
    }}>


    <div className="form-group mr-sm-2">

    <div className="form-group mr-sm-2"></div>
    <input
      id= 'amount'   
      type="text"
      className="form-control-sm"
      placeholder="Convert to Fives"
      required
      ref={(input) => {this.amount = input}}
    />


    <div className="form-group mr-sm-2"></div>
    <input
      type='submit'
      className='btn btn-block btn-primary'
      value='Convert to Fives'
    />
    </div></form> 

    <ul>
      <li>Ones' Address:  0xB71a1D29DA98f68Bc0c7177E4a94f17684520614</li>
      <li>Five's Address:  0x7C8E67FeB0d186Bb62311C68648a2463b118A1D3</li>
    </ul>        
    </View>
    )
  }
}
export default Convert;
