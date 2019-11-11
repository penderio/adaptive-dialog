import React from 'react'
import Portal from './Portal'
import { Popper } from 'react-popper'
import Popover from './Popover'
import Button from '@pndr/button'
import { css } from 'emotion'
import Fader from './Fader'

const DialogHeader = ({ title, onClose }) => (
    <div
        className={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 44px;
        z-index: 1;
    `}
    >
        <div
            className={css`
            position: relative;
            display: flex;
            align-items: stretch;
            justify-content: center;
            flex-grow: 0;
            flex-shrink: 0;
            height: 44px;
            box-shadow: rgba(55, 53, 47, 0.09) 0px 1px 0px;
            font-size: 16px;
            color: rgb(55, 53, 47);
            background-color: rgb(255, 255, 255);
        `}
        >
            <div
                className={css`
            display: flex;
            align-items: center;
            flex: 1 1 0%;
            `}
            >

            </div>
            <div
                className={css`
                flex: 1 1 0%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                white-space: nowrap;
            `}
            >
                {title}
            </div>
            <div
                className={css`
            display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1 1 0%;
            `}
            >
                <Button size={'sm'} minimal primary onClick={onClose} className={css`margin-right: 8px;`}>
                    Done
                </Button>
            </div>
        </div>
    </div>
)

export default class ResponsiveDialog extends React.Component {

    static defaultProps = {
        title: 'Unnamed Dialog'
    }

    render() {

        if (window.outerWidth > 768) {

            if (this.props.referenceElement) {

                return (
                    <React.Fragment>
                        <Popper placement={this.props.popoverPlacement} referenceElement={this.props.referenceElement}>
                            {({ placement, ref, style }) => (
                                <Portal mobile={false} onClose={this.props.onClose}>
                                    <div ref={ref} style={style} data-placement={placement}>
                                        <Popover width={this.props.width || this.props.referenceElement.clientWidth} onClose={this.props.onClose}>
                                            {this.props.children({
                                                mobile: false
                                            })}
                                        </Popover>
                                    </div>
                                </Portal>
                            )}
                        </Popper>
                    </React.Fragment>
                )
            }

            return (
                <React.Fragment>
                    <Portal mobile={false} onClose={this.props.onClose}>
                        <Fader onClose={this.props.onClose}>
                            <Popover onClose={this.props.onClose}>
                                {this.props.children({
                                    mobile: false
                                })}
                            </Popover>
                        </Fader>
                    </Portal>
                </React.Fragment>
            )
        }

        return (
            <Portal mobile={true} onClose={this.props.onClose}>
                <div
                    className={css`
                        padding-top: 44px;
                        padding-bottom: 44px;
                    `}
                >
                    <DialogHeader
                        title={this.props.title}
                        onClose={this.props.onClose}
                    />
                    {this.props.children({
                        mobile: true
                    })}
                </div>
            </Portal>
        )
    }
}