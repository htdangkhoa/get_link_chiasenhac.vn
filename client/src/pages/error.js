import { h, render, Component } from 'preact'
import styledComponents from 'styled-components'
import { Container, Button } from 'reactstrap'

const Wrapper = styledComponents.div`
    text-align: center;

    h1 {
        font-size: 12em;
        font-weight: 600;
        position: relative;
        line-height: 180px;
    }

    p {
        font-size: 40px;
    }

    button {
        background: transparent;
        border: 2px solid #212529;
        text-transform: uppercase;
        color: #212529;
    }
`.withComponent(Container)

export default class Error extends Component {
    render() {
        return(
            <Wrapper>
                <div className='center'>
                    <h1>404</h1>
                    <p>Oops, the page you're looking for doesn't exist.</p>
                    <a href="/"><Button>Go to homepage</Button></a>
                </div>
            </Wrapper>
        )
    }
}