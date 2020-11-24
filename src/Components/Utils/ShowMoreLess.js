/*

This is from version 1.0.4:

- github: https://github.com/devzonetech/react-show-more-text/blob/master/src/ShowMoreText.js
- npm: https://www.npmjs.com/package/react-show-more-text

*/
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Truncate from './react-truncate'
// import Truncate from 'react-truncate'

// class ShowMoreLess extends Component {
export default class ShowMoreLess extends Component {
  static defaultProps = {
    lines: 3,
    more: 'Show more',
    less: 'Show less',
    anchorClass: '',
    onClick: undefined
  }

  static propTypes = {
    children: PropTypes.node,
    lines: PropTypes.number,
    more: PropTypes.node,
    less: PropTypes.node,
    anchorClass: PropTypes.string,
    onClick: PropTypes.func
  }

  state = {
    expanded: false,
    truncated: false
  }

  handleTruncate = truncated => {
    if (truncated !== this.state.truncated) {
      this.setState({
        truncated
      })
    }
  }

  toggleLines = event => {
    event.preventDefault()
    const _self = this
    this.setState({
      expanded: !this.state.expanded
    }, () => {
      if (_self.props.onClick) {
        _self.props.onClick(_self.state.expanded)
      }
    })
  }

  render() {
    const {
      children,
      more,
      less,
      lines,
      anchorClass
    } = this.props

    const {
      expanded,
      truncated
    } = this.state

    return (
      <div>
        <Truncate
          lines={!expanded && lines}
          ellipsis={(
            <span>... <a href='#' className={anchorClass} onClick={this.toggleLines}>{more}</a></span>
          )}
          onTruncate={this.handleTruncate}
        >
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span> <a href='#' className={anchorClass} onClick={this.toggleLines}>{less}</a></span>
        )}
      </div>
    )
  }
}
