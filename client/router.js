import Routes from 'preact-router'
import { h, render, Component } from 'preact'

import Home from './src/pages/home'
import Download from './src/pages/download'
import Error from './src/pages/error'

export default class Router extends Component {
    render() {
        return(
            <Routes>
                <Home path='/'/>
                <Download path='/download/:title/:artist/:link'/>
                <Error type='404' default/>
            </Routes>
        )
    }
}