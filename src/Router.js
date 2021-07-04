import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import HomeView from './view/HomeView'
import BookView from './view/BookView'
import CartView from './view/CartView'
import OrderView from './view/OrderView'
import AdminView from './view/AdminView'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route path="/Cart" component={CartView} />
                    <Route path="/Order" component={OrderView} />
                    <Route path="/Admin" component={AdminView} />
                    <Route path="/BookDetails/:id" component={BookView} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        )
    }
}
