import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, Heading, Paragraph, Box } from '@pndr/demo-utils'
import { css, injectGlobal } from 'emotion'
import Button from '@pndr/button'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        margin: 0;
    }
`

import AdaptiveDialog from '../../src'

class Example1 extends Component {

    state = {
        open: false
    }

    componentDidMount() {

        this.button = ReactDOM.findDOMNode(this.refs.button)
    }

    render() {
        return <div>
            <Heading>
                With reference element
            </Heading>
            <Box>
                <Button
                    size={'sm'}
                    ref={'button'}
                    onClick={this.handleClick}
                >
                    Open dialog
                </Button>
                {this.state.open ? (
                    <AdaptiveDialog
                        referenceElement={this.button}
                        popoverPlacement={'bottom-start'}
                        width={300}
                        onClose={() => this.setState({ open: false })}
                    >
                        {({ mobile }) => (
                            <div
                                className={css`
                                    padding: 16px;
                                `}
                            >
                                <div
                                    className={css`
                                        margin-bottom: 16px;
                                    `}
                                >
                                    mobile: {mobile ? 'true' : 'false'}
                                </div>
                                <input type="text" defaultValue="Default value" />
                            </div>
                        )}
                    </AdaptiveDialog>
                ) : null}
            </Box>
            <Paragraph>
                State
            </Paragraph>
            <Box>
                <pre>
                    {JSON.stringify(this.state, null, 2)}
                </pre>
            </Box>
        </div>
    }

    handleClick = () => {

        this.setState({
            open: true
        })
    }
}


class Example2 extends Component {

    state = {
        open: false
    }

    componentDidMount() {

        this.button = ReactDOM.findDOMNode(this.refs.button)
    }

    render() {
        return <div>
            <Heading>
                Without reference element
            </Heading>
            <Box>
                <Button
                    size={'sm'}
                    ref={'button'}
                    onClick={this.handleClick}
                >
                    Open dialog
                </Button>
                {this.state.open ? (
                    <AdaptiveDialog
                        popoverPlacement={'bottom-start'}
                        width={300}
                        onClose={() => this.setState({ open: false })}
                    >
                        {({ mobile }) => (
                            <div
                                className={css`
                                    padding: 16px;
                                `}
                            >
                                <div
                                    className={css`
                                        margin-bottom: 16px;
                                    `}
                                >
                                    mobile: {mobile ? 'true' : 'false'}
                                </div>
                                <input type="text" defaultValue="Default value" />
                            </div>
                        )}
                    </AdaptiveDialog>
                ) : null}
            </Box>
            <Paragraph>
                State
            </Paragraph>
            <Box>
                <pre>
                    {JSON.stringify(this.state, null, 2)}
                </pre>
            </Box>
        </div>
    }

    handleClick = () => {

        this.setState({
            open: true
        })
    }
}

class Demo extends React.Component {

    render() {

        return (
            <Canvas>
                <Example1 />
                <Example2 />
            </Canvas>
        )
    }
}

ReactDOM.render(<Demo />, document.querySelector('#demo'))
