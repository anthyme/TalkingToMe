import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

export default class DropZone extends Component {

  handleChange(files:any) {
    this.setState({
      files: files,
    });
  }
  render() {
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        acceptedFiles={['application/ppt']}
        dropzoneText="Drop your ppt file here, or click for file explorer"
      />
    );
  }
}
//export default DropZone = withSearchValue(DropZone);
