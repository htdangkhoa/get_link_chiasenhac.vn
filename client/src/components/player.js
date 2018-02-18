import { h, render, Component } from 'preact'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { TiMediaPlay, TiMediaPause } from 'react-icons/lib/ti'
import ReactPlayer from 'react-player'
import styledComponents from 'styled-components'

const Wrapper = styledComponents.div`
    margin-top: 15px;

    .player {
        margin-top: 15px;
        width: 100%;
        height: 48px;
        background: #888;
        border-radius: .25rem;
    }

    .slider-container {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        width: 1%;
        margin-bottom: 0;
        background: #e9ecef;
        border: 1px solid #ced4da;
        padding: 0px 15px;
        display: flex;
        align-items: center;

        .slider {
            -webkit-appearance: none;
            width: 100%;
            height: 5px;
            border-radius: 2.5px;   
            background: #ced4da;
            outline: none;
            -webkit-transition: .2s;
            transition: opacity .2s;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                border-radius: 50%; 
                background: #495057;
                cursor: pointer;
            }

            &::-moz-range-thumb {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background: #495057;
                cursor: pointer;
            }
        }
    }
`

export default class Player extends Component {
    constructor(props) {
        super(props)

        this.state = {
            duration: 0,
            playing: false,
            seeking: false
        }
    }

    ref = player => {
        this.player = player
    }

    onReady = () => {
        this.setState({ playing: true })
    }

    onPlay = () => {
        this.setState({ playing: true })
    }

    onPause = () => {
        this.setState({ playing: false })
    }

    onEnded = () => {
        this.setState({ playing: true })
    }

    onProgress = state => {
        if (!this.state.seeking) this.setState(state)
    }

    onDuration = duration => {
        this.setState({ duration })
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onSeekChange = e => {
        this.setState({ seekValue: parseFloat(e.target.value / this.state.played) })
    }

    clickHandler = () => {
        this.setState({ playing: !this.state.playing })
    }

    render() {
        return(
            <Wrapper>
                <ReactPlayer 
                    hidden 
                    ref={this.ref} 
                    url={this.props.url} 
                    playing={this.state.playing} 
                    loop 
                    onReady={this.onReady}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onEnded={this.onEnded}
                    onProgress={this.onProgress}
                    onDuration={this.onDuration}
                />
                <InputGroup>
                    <div className='input-group-prepend'>
                        <button className='input-group-text' onClick={this.clickHandler.bind(this)}>
                            {this.state.playing ? <TiMediaPause size={22}/> : <TiMediaPlay size={22}/>}
                        </button>
                    </div>
                    <div className='slider-container'>
                        <input
                            type='range' 
                            className='slider'
                            min={0} 
                            max={1} 
                            step='any'
                            value={this.state.played || 0}
                            onMouseDown={this.onSeekMouseDown}
                            onChange={this.onSeekChange}
                            onMouseUp={this.onSeekMouseUp} />
                    </div>
                    <div className='input-group-append'>
                        <div className='input-group-text'>{formatTime(this.state.duration * this.state.played)} | {formatTime(this.state.duration)}</div>
                    </div>
                </InputGroup>
            </Wrapper>
        )
    }
}

const formatTime = seconds => {
    if (!seconds) return `0:00`

    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

const pad = string => {
    return ('0' + string).slice(-2)
}