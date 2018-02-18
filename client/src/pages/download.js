import { h, render, Component } from 'preact'
import { Container } from 'reactstrap'
import styledComponents from 'styled-components'
import Player from '../components/player'

const Wrapper = styledComponents.div`

`.withComponent(Container)

export default class Download extends Component {
    componentWillMount() {
        
    }

    render() {
        return(
            <Wrapper>
                <Player />
            </Wrapper>
        )
    }
}