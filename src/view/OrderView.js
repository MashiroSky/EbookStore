import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo'
import { OrderList } from '../components/OrderList'
import { OrderList_ } from '../components/OrderList_'
import store from '../redux/store'

export default class OrderView extends Component {
    render() {
        const user = store.getState().user
        if (user === null) return (
            <div>
                <HeaderInfo />
                <OrderList />
            </div>
        )
        else if (user.user_type === 0) return (
            <div>
                <HeaderInfo />
                <OrderList />
            </div>
        )
        else return (
            <div>
                <HeaderInfo />
                <OrderList />
                <OrderList_ />
            </div>
        )
    }
}