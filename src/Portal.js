import React from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends React.Component {
    constructor(props) {
        super(props)
        this.hiddenElements = null
        this.el = document.createElement('div')
        this.el.tabIndex = 0
        this.el.classList.add('portal')
        this.el.addEventListener('keydown', this.handleKeydown)
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        const modalRoot = document.getElementsByTagName('body')[0]
        modalRoot.appendChild(this.el)
        this.makeFrontPortalVisible()
    }

    showElement = (el) => {

        if (el.style.display === 'block') {
            return
        }

        el.style.display = 'block'

        const scrollTop = el.getAttribute('data-scrolltop')

        const html = document.getElementsByTagName('html')[0]

        html.scrollTop = scrollTop

        el.removeAttribute('data-scrolltop')
    }

    hideElement = (el) => {

        if (el.style.display === 'none') {
            return
        }

        const html = document.getElementsByTagName('html')[0]

        el.setAttribute('data-scrolltop', html.scrollTop)

        el.style.display = 'none'
    }

    makeFrontPortalVisible() {

        if (!this.props.mobile) {
            return
        }

        const root = document.getElementById('demo')
        const portals = document.querySelectorAll('.portal')

        if (!portals.length) {
            this.showElement(root)
            return
        }

        this.hideElement(root)

        portals.forEach((portal, index) => {

            if (index === portals.length - 1) {
                this.showElement(portal)
            } else {
                this.hideElement(portal)
            }
        })
    }

    componentWillUnmount() {
        const modalRoot = document.getElementsByTagName('body')[0]
        this.el.removeEventListener('keydown', this.handleKeydown)
        modalRoot.removeChild(this.el)
        this.makeFrontPortalVisible()
    }

    handleKeydown = e => {

        if (e.key === 'Escape') {

            e.stopPropagation()

            if (this.props.onClose) {
                this.props.onClose()
            }
        }
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        )
    }
}