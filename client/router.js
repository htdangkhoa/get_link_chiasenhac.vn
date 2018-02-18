import Routes from 'preact-router'
import { h, render, Component } from 'preact'

import Home from './src/pages/home'
import Error from './src/pages/error'

export default class Router extends Component {
    render() {
        return(
            <Routes>
                <Home path='/'/>
                <Error type='404' default/>
            </Routes>
        )
    }
}