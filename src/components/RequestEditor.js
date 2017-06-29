import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './common/ListErrors'
import GoogleMap from './common/Maps/GoogleMap'
import TagList from './common/TagList'
import ImageUpload from './common/ImageUpload'
import agent from '../agent'

import {
  SUBMIT_REQUEST,
  REQUEST_EDITOR_LOADED,
  REQUEST_EDITOR_UNLOADED,
  UPDATE_FIELD_REQUEST,
  ADD_TAG_REQUEST,
  REMOVE_TAG_REQUEST
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.requestEditor
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: REQUEST_EDITOR_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: REQUEST_EDITOR_UNLOADED
  }),
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_REQUEST,
    key,
    value
  }),
  onAddTag: () => dispatch({
    type: ADD_TAG_REQUEST
  }),
  onRemoveTag: tag => dispatch({
    type: REMOVE_TAG_REQUEST,
    tag
  }),
  onSubmit: payload => dispatch({
    type: SUBMIT_REQUEST,
    payload
  })
})

class RequestEditor extends React.Component {
  constructor(){
    super()

    this.state = {
      first: true,
      checked: false
    }

    this.expand = () => this.setState({
      checked: !this.state.checked
    })

    this.changeStartTime = ev => this.props.onUpdateField('startTime', ev.target.value)
    this.changeStartPlace = ev => this.props.onUpdateField('startPlace', ev.target.value)
    this.changeEndTime = ev => this.props.onUpdateField('endTime', ev.target.value)
    this.changeEndPlace = ev => this.props.onUpdateField('endPlace', ev.target.value)
    this.changeText = ev => this.props.onUpdateField('text', ev.target.value)
    this.changeTagInput = ev => this.props.onUpdateField('tagInput', ev.target.value)
    this.changeImage = url => this.props.onUpdateField('image', url)

    this.watchForEnter = ev => {
      if(ev.keyCode === 13 && ['ongoing', 'ongoing-taken', 'done', ''].indexOf(this.props.tagInput.toLowerCase()) === -1){
        ev.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTag = tag => ev => {
      ev.preventDefault()
      this.props.onRemoveTag(tag)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const request = {
        start_time: this.props.startTime,
        start_place: this.props.startPlace,
        end_time: this.props.endTime,
        end_place: this.props.endPlace,
        text: this.props.text,
        image: this.props.image,
        tag_list: this.props.tagList
      }

      const requestId = this.props.requestId
      const payload = requestId ?
        agent.Requests.update(Object.assign(request, { requestId })):
        agent.Requests.create(request)

      this.props.onSubmit(payload)
    }
  }

  componentWillReceiverProps(nextProps){
    if(this.props.params.requestId !== nextProps.params.requestId){
      this.props.onUnload()
      this.setState({ checked: false })
      if(nextProps.params.requestId){
        this.setState({ checked: true, first: false })
        this.props.onLoad(agent.Requests.get(this.props.params.requestId))
      }
    }
  }

  componentWillMount(){
    if(this.props.params.requestId){
      this.props.onLoad(agent.Requests.get(this.props.params.requestId))
      this.setState({ checked: true, first: false })
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    return (
      <div className='editor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>

              <ListErrors errors={this.props.error} />

              <form>
                <fieldset>
                  <fieldset className='form-group'>
                    <textarea
                      className='form-control form-control-lg'
                      rows='5'
                      placeholder="委託內容"
                      value={this.props.text}
                      onChange={this.changeText} />
                  </fieldset>

                  <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                      <label htmlFor='toggle'>
                        <i>可選:</i> 填寫幾時開始
                      </label>
                      &nbsp;&nbsp;
                      <input
                        id='toggle'
                        type='checkbox'
                        checked={this.state.checked}
                        onChange={this.expand} />

                      <div id='expand'>
                        <fieldset className='form-group'>
                          <strong>開始時間:</strong>
                          <input
                            className='form-control form-control-lg'
                            type='datetime-local'
                            value={this.props.startTime}
                            onChange={this.changeStartTime} />
                        </fieldset>
                        <fieldset className='form-group'>
                          <strong>開始地點:</strong>
                          <input
                            className='form-control form-control-lg'
                            type='text'
                            placeholder='開始地點(可選)'
                            value={this.props.startPlace}
                            onChange={this.changeStartPlace} />
                        </fieldset>
                      </div>

                      <fieldset className='form-group'>
                        <strong>結束時間:</strong>
                        <input
                          className='form-control form-control-lg'
                          type='datetime-local'
                          value={this.props.endTime}
                          onChange={this.changeEndTime} />
                      </fieldset>
                      <fieldset className='form-group'>
                        <strong>結束地點:</strong>
                        <input
                          className='form-control form-control-lg'
                          type='text'
                          placeholder='結束地點'
                          value={this.props.endPlace}
                          onChange={this.changeEndPlace} />
                      </fieldset>
                    </div>

                    <div className='col-md-6 col-xs-12'>
                      { this.state.first ?
                        <GoogleMap startPlace={this.props.startPlace} endPlace={this.props.endPlace} />
                        : this.props.endPlace ?
                        <GoogleMap startPlace={this.props.startPlace} endPlace={this.props.endPlace} />
                        : null
                      }
                      <br />
                    </div>
                  </div>

                  <strong>標籤:</strong>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='建議&#39;delivering&#39;, &#39;production&#39; & &#39;shopping&#39;'
                      // except status tags, e.g. ongoing, ongoing-taken, done
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter} />

                    <TagList unit={this.props} removeTag={this.removeTag} />
                  </fieldset>

                  <strong>相片:</strong>
                  <ImageUpload
                    image={this.props.image}
                    changeImage={this.changeImage} />

                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    onClick={this.submitForm}
                    disabled={this.props.inProgress}>
                    { this.props.requestId ? '更新' : '散出' }委託
                  </button>
                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestEditor)
