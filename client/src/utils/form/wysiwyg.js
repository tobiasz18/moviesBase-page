import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import htmlToDraft from 'html-to-draftjs'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Wysiwyg = ({ handleEditorState, handleEditorBlur, editContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)

    const HTMLdata = stateToHTML(editorState.getCurrentContent())
    handleEditorState(HTMLdata)
  }

  useEffect(() => {
    if (editContent) {
      const contentBlock = htmlToDraft(editContent)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)

      setEditorState(editorState)
    }
  }, [editContent])

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
      onBlur={handleEditorBlur}
    />
  )
}

export default Wysiwyg