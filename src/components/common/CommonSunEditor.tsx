import dynamic from "next/dynamic";
import React, { FC, useRef } from "react";
import "suneditor/dist/css/suneditor.min.css";

interface CustomSunEditorProps {
  value: string;
  onChange: (content: string) => void;
  // setOptions?: any;
  additionalOptions?: any; // Define your additional options here
  error?: any;
  // features?: any;
}

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

/**
 * A custom SunEditor component with a predefined set of features.
 *
 * The component will render a SunEditor with the given value and call the onChange function when the content is changed.
 * The component also accepts an error prop which will render an error message below the editor.
 *
 * The component uses the following features by default:
 * - font: Arial, tahoma, Courier New, Courier, Montserrat
 * - fontSize: 10-24
 * - formatBlock: heading, paragraph, blockquote
 * - paragraphStyle: normal, address, preformatted
 * - blockquote: quote
 * - bold, underline, italic, strike, subscript, superscript
 * - fontColor, hiliteColor
 * - textStyle: normal, heading1, heading2, heading3, heading4, heading5, heading6
 * - removeFormat
 * - outdent, indent
 * - align: left, center, right, justify
 * - horizontalRule
 * - list: ordered, unordered
 * - lineHeight: 1-7
 * - link
 * - fullScreen
 * - showBlocks
 * - codeView
 * - preview
 *
 * The component also sets the following options:
 * - tableResizable: true
 * - imageResizable: true
 * - setDefaultStyle: sets the default font-family to Montserrat
 *
 * You can pass additional options to the component by using the additionalOptions prop.
 * For example, you can add a custom button to the editor by adding it to the buttonList array.
 *
 * @param {{ value: string; onChange: (content: string) => void; error?: string; additionalOptions?: any; }} props
 * @returns {JSX.Element}
 */
const CustomSunEditor: FC<CustomSunEditorProps> = ({
  value,
  onChange,
  // features,
  error,
}) => {
  const editor = useRef();

  /**
   * Stores the SunEditor instance in the editor ref.
   *
   * The SunEditor instance is passed as an argument by the SunEditor component.
   * The instance is stored in the editor ref, which is then used to call functions
   * on the SunEditor instance, such as getContent, which returns the current content
   * of the editor.
   *
   * @param {any} sunEditor - The SunEditor instance.
   */
  const getSunEditorInstance = (sunEditor: any) => {
    editor.current = sunEditor;
  };

  const additionalOptions = {
    font: ["Arial", "tahoma", "Courier New,Courier", "Montserrat"],
    buttonList: [
      [
        "undo",
        "redo",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
        "link",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
        // ...(features || []),
      ],
    ],
    colorList: [
      "#377737",
      "#F4B519",
      "#0096B7",
      "#FFF1CD",
      "#FFFFFF",
      "#000000",
    ],

    tableResizable: true, // Enable table resizing
    imageResizable: true, // Enable image resizing
    setDefaultStyle: `
      body {
        font-family: 'Montserrat', sans-serif;
      }
    `,
  };

  return (
    <div className="flex flex-col gap-1">
      <SunEditor
        setContents={value}
        getSunEditorInstance={getSunEditorInstance}
        onChange={onChange}
        setOptions={{
          ...additionalOptions,
        }}
      />
      {error && <p className="text-xs text-red-800">{error}</p>}
    </div>
  );
};

export default CustomSunEditor;
