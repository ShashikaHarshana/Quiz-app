import React, {useRef, useEffect, useState} from 'react'
import * as monaco from 'monaco-editor';


export default function TextEditor() {
  const [editor, setEditor] = useState(null);
  const [javaCode, setJavaCode] = useState('public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}');

  // Function to initialize Monaco Editor
  const initEditor = () => {
    if (!editor) {
      const editorInstance = monaco.editor.create(document.getElementById('editor-container'), {
        value: javaCode,
        language: 'java',
        theme: 'vs-dark', // Change the theme if needed
      });

      setEditor(editorInstance);

      // Handle code changes
      editorInstance.onDidChangeModelContent(() => {
        setJavaCode(editorInstance.getValue());
      });
    }
  };

  // Function to compile Java code
  const compileCode = () => {
    // Send the 'javaCode' to your server for compilation and error checking
    // Handle the compilation result and display error messages
    // You can use Axios or Fetch API to make a POST request to your server
    // Example:
    /*
    axios.post('/compile', { javaCode })
      .then((response) => {
        // Handle the compilation result here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
    */
  };

  return (
    <div>
      <div id="editor-container" style={{ height: '400px' }} />
      <button onClick={compileCode}>Compile</button>
    </div>
  )
}
