import { h, render, Component } from 'preact'
import { Container } from 'reactstrap'
import Form from './form'
import Result from './result'

export default class App extends Component {
    render() {
        return(
            <Container>
                <Form />
                <Result />
            </Container>
        )
    }
}