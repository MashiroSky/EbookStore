import React, { Component } from 'react'
import { Input } from 'antd'
import { withRouter } from 'react-router'

export class Search extends Component {
    onSearch(value) {
        console.log(value)
        let url = "http://localhost:8080/search?title=" + value
        fetch(url).then(
            response => response.json()
        ).then(
            response => {
                this.props.history.push({ pathname: '/', data: response })
            }
        ).catch(
            error => { console.log(error) }
        )
    }

    render() {
        const { Search } = Input
        return (
            <Search placeholder="搜索书籍" onSearch={(value) => this.onSearch(value)} style={{ width: 200, 'marginTop': '16px' }} />
        )
    }
}

export default withRouter(Search)