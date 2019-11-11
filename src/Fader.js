import React from 'react'
import { css, cx, keyframes } from 'emotion'

export default class Fader extends React.Component {

    static defaultProps = {
        width: 600
    }

    state = {
        closing: false
    }

    fadeOut = () => new Promise((resolve) => {

        this.setState({
            closing: true
        })

        setTimeout(resolve, 500)
    })

    render() {

        const scaleIn = keyframes`
            0% {
                transform: scale(0.1);
            }
            100% {
                transform: scale(1);
            }
        `

        const scaleOut = keyframes`
            0% {
                transform: scale(1);
            }
            100% {
                transform: scale(0.1);
            }
        `

        const fadeOut = keyframes`
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        `

        return (
            <div
                className={css`
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `}
                onClick={this.props.onClick}
            >
                <div
                    className={cx(
                        !this.props.transparent ? css`
                        background-color: rgba(0, 0, 0, 0.6);
                        &:hover {
                            background-color: rgba(0, 0, 0, 0.58);
                        }
                        &:active {
                            background-color: rgba(0, 0, 0, 0.6);
                        }
                        ` : null,
                        css`
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        cursor: pointer;
                        transition: 200ms ease background-color;
                        ${this.state.closing ? `animation: ${fadeOut} 200ms ease; animation-delay: 300ms;` : null}
                    `)}
                    onClick={this.props.onClose}
                />
                <div
                    className={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1090;
                    transform: ${this.state.closing ? 'scale(0)' : 'scale(1)'};
                    animation: ${this.state.closing ? scaleOut : scaleIn} 300ms cubic-bezier(0.4, 0, 0.2, 1);
                    @media (min-width: 768px) {
                        position: relative;
                        right: auto;
                        width: ${this.props.width}px;
                        max-height: calc(100vh - 60px);
                        border-radius: 6px;
                        overflow-x: hidden;
                        overflow-y: auto;
                    }
                `}
                    onClick={e => {
                        e.stopPropagation()
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}