import React, { Component } from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {withSearchValue} from "../../enhancers/WithSearchValue"
 
export default class DropZone extends Component {
    constructor(props){
        super(props);
        this.state = {
          files: []
        };
      }
      handleChange(files){
        this.setState({
          files: files
        });
      }
      render(){
        return (
          <DropzoneArea 
            onChange={this.handleChange.bind(this)}
            acceptedFiles = {['application/ppt']}
            dropzoneText = "Drop your ppt file here, or click for file explorer"
            />
        );
    }
}
//export default DropZone = withSearchValue(DropZone);