// External Libraries
import React, {useRef, useState} from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin,{defaultSuggestionsFilter} from '@draft-js-plugins/mention';
import '@draft-js-plugins/mention/lib/plugin.css';


// Components
import mentions from "./personMentions";

// Styling
import editorStyles from './editorStyle.module.css';

//Draft-JS-Mentions plugin configuration
const mentionPlugin = createMentionPlugin({ mentionTrigger: ['@', '('] });
const {MentionSuggestions} = mentionPlugin
const plugins = [mentionPlugin, ]


const TextInput = () => {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [suggestions, setSuggestions] = useState(mentions);
  const [open, setOpen] = useState(false);
  const ref = useRef(null)
  


    

    const onSearchChange = ({value, trigger}) => {
        setSuggestions(defaultSuggestionsFilter(value, mentions, trigger))
    }

    
    

    return (
        <div className={editorStyles.editor} onClick={() => {
            ref.current.focus();
            setOpen(false)
          }}>
            <Editor
              editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
            />
            <MentionSuggestions
            onSearchChange={onSearchChange}
            suggestions={suggestions}
            open={open}
            onOpenChange={() => setOpen(true)}
            onAddMention={() => {
                setOpen(false)}}
            
            />
            
        </div>
    );
}

export default TextInput