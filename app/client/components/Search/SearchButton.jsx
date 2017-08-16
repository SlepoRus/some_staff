import React from 'react';

export default class SearchButton extends React.Component {
  constructor(props) {
    super(props)
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.props.onClick(this.props.text);
    }
  }

  componentWillMount() {
     document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
     document.removeEventListener('keydown', this.handleKeyPress);
  }
  render() {
    const { onClick, text, disabled } = this.props;
    return (
      <button onClick={()=> onClick(text)} onKeyDown={this.handleKeyPress} disabled={disabled}> Search </button>
    )
  }
}
