<<<<<<< HEAD
import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import { withSearchValue } from '../../enhancers/WithSearchValue'

export default class DropZone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
    }
=======
import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import { withSearchValue } from '../../enhancers/WithSearchValue';

export default class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8
  }
  handleChange(files) {
    this.setState({
      files: files,
<<<<<<< HEAD
    })
=======
    });
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8
  }
  render() {
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        acceptedFiles={['application/ppt']}
        dropzoneText="Drop your ppt file here, or click for file explorer"
      />
<<<<<<< HEAD
    )
=======
    );
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8
  }
}
//export default DropZone = withSearchValue(DropZone);
