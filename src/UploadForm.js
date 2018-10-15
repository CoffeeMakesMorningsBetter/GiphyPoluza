import React, { Component } from 'react';

class UploadForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      source_image_url: '',
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileOnChange = this.fileOnChange.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  fileOnChange(e) {
    this.setState({[e.target.name]: e.target.files[0]})
  }

  handleSubmit(e) {
    e.preventDefault();
  
    let { source_image_url } = this.state
    let formData = new FormData()
    formData.append('source_image_url', source_image_url)
  
    this.props.dataUpload(formData)
    this.setState({ source_image_url: '', file: null })
  }

  render() {
    let { source_image_url } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='source_image_url'></label>
        <input 
          id='source_image_url'
          type='text'
          name='source_image_url'
          value={source_image_url}
          onChange={this.handleChange}
        />
        <input type='submit'/>
      </form>
    )
  }
}

export default UploadForm