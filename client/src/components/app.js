import { h, render, Component } from 'preact'
import { Container } from 'reactstrap'
import Form from './form'

export default class App extends Component {
    render() {
        return(
            <Container>
                <Form />
            </Container>
        )
    }
}