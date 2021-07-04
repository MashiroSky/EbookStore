import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo'
import {CartList} from '../components/CartList'

export default class CartView extends Component {
    render() {
        return (
            <div>
                <HeaderInfo />
                <CartList />
            </div>
        )
    }
}
