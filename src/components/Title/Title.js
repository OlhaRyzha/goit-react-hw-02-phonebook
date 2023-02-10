import { Component } from 'react';
import { MainTitle } from './Title.styled';
import PropTypes from 'prop-types';

export class Title extends Component {
  render() {
    return <MainTitle>{this.props.message}</MainTitle>;
  }
}
Title.propTypes = {
  message: PropTypes.string,
};
