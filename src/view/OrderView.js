import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo'
import {OrderList} from '../components/OrderList'

export default class OrderView extends Component {
    render() {
        return (
            <div>
                <HeaderInfo />
                <OrderList />
            </div>
        )
    }
}
