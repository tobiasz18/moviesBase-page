import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Wysiwyg = ({handleEditorState}) => {
  const [editorState, seteditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    seteditorState(editorState)

    const contentToHtml = stateToHTML(editorState.getCurrentContent())
    handleEditorState(contentToHtml)
  }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  )
}

export default Wysiwyg