"use client";
import { Button } from "@/components/ui/button";
import { Check, Heading1, Heading2, ListIcon, ListOrdered, PlusCircle } from "lucide-react";
import { BotIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { ListStart } from "lucide-react";
import { BoldIcon, UnderlineIcon, Code, ItalicIcon, ImageIcon } from "lucide-react";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element,
  Transforms,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { useState, useCallback, useRef } from "react";

type CustomElement = {
  type: "code" | "paragraph" | "heading" | "list-item" | "image";
  url?: string;
  alt?: string;
  children: CustomText[];
};
type CustomText = {
  text: string;
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
};
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

function Homepage() {

  const [noteValue, setNoteValue] = useState("");
  console.log(noteValue)

  const [isActivea, setIsActivea] = useState(false)
  const [isActiveb, setIsActiveb] = useState(false)
  const [isActivec, setIsActivec] = useState(false)
  const [isActivee, setIsActivee] = useState(false)
  const [isActivef, setIsActivef] = useState(false)
  const [isActiveg, setIsActiveg] = useState(false)
  const [isActiveh, setIsActiveh] = useState(false)
  const [isActivei, setIsActivei] = useState(false)

  function handleActivea() {
    setIsActivea(item => !item)
  }
  function handleActiveb() {
    setIsActiveb(item => !item)
  }
  function handleActivec() {
    setIsActivec(item => !item)
  }

  function handleActivee() {
    setIsActivee(item => !item)
  }
  function handleActivef() {
    setIsActivef(item => !item)
  }
  function handleActiveg() {
    setIsActiveg(item => !item)
  }
  function handleActiveh() {
    setIsActiveh(item => !item)
  }
  function handleActivei() {
    setIsActivei(item => !item)
  }

  const stylesa = isActivea ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylesb = isActiveb ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylesc = isActivec ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylese = isActivee ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylesf = isActivef ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylesg = isActiveg ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylesh = isActiveh ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const stylesi = isActivei ? 
{
    backgroundColor: "#222"
} :
{
    backgroundColor: ""
} 
  const [editor] = useState(() => {
    const editor = withReact(createEditor());
    const { isVoid } = editor;
    editor.isVoid = (element) =>
      element.type === "image" ? true : isVoid(element);
    return editor;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
  console.log({ editor, initialValue });

  const CustomEditor = {
    handlePaste(editor, event) {
       const text = event.clipboardData.getData('text/plain')
       
        console.log('onPaste', event.clipboardData.getData('text/plain'))
    },

    isBoldMarkActive(editor) {
      const marks = Editor.marks(editor);
      return marks ? marks.bold === true : false;
    },

    isUnderlineMarkActive(editor) {
      const marks = Editor.marks(editor);
      return marks ? marks.underline === true : false;
    },

    isItalicMarkActive(editor) {
      const marks = Editor.marks(editor);
      return marks ? marks.italic === true : false;
    },

    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "code",
      });

      return !!match;
    },

    insertImage(editor, url) {
      const text = { text: "" };
      const image: CustomElement = { type: "image", url, children: [text] };
      Transforms.insertNodes(editor, image);
    },

    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "bold");
      } else {
        Editor.addMark(editor, "bold", true);
      }
    },

    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? "paragraph" : "code" },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      );
    },

    toggleUnderlineMark(editor) {
      const isActive = CustomEditor.isUnderlineMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "underline");
      } else {
        Editor.addMark(editor, "underline", true);
      }
    },

    toggleItalicMark(editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "italic");
      } else {
        Editor.addMark(editor, "italic", true);
      }
    },
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        CustomEditor.insertImage(editor, url);
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = "";
    }
  };

  const renderLeaf = useCallback((props) => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? "bold" : "normal",
          fontStyle: props.leaf.italic ? "italic" : "normal",
          textDecoration: props.leaf.underline ? "underline" : "none",
        }}
      >
        {props.children}
      </span>
    );
  }, []);
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return (
          <pre
            {...props.attributes}
            style={{ backgroundColor: "#000", color: "white" }}
          >
            <code>{props.children}</code>
          </pre>
        );
      case "paragraph":
        return <p {...props.attributes}>{props.children}</p>;
      case "image": {
        const { url, alt } = props.element;
        return (
          <div {...props.attributes}>
            <div contentEditable={false}>
              <Image
                src={url}
                alt={alt || ""}
                className="block max-h-80 max-w-full"
              />
            </div>
            {props.children}
          </div>
        );
      }
      case "heading":
        return <h1 {...props.attributes}>{props.children}</h1>;
      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);
  
  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-end gap-4">
          <Drawer>
            <DrawerTrigger>
              <Button
                variant="outline"
                className="mt-4 flex w-[120px] justify-center bg-black text-gray-100 hover:bg-[#444] hover:text-white dark:border-1 dark:border-green-300 dark:text-gray-200 dark:hover:bg-[#111]"
              >
                <span>
                  <BotIcon />
                </span>
                Ask Ai
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Drawer >
            <DrawerTrigger>
              <Button
                variant="outline"
                className="mt-4 flex w-[120px] justify-center dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200"
              >
                <span>
                  <PlusCircle />
                </span>
                New note
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[100vh] bg-white dark:bg-[#000]">
              <DrawerHeader>
                <DrawerTitle className="text-lg">New Note</DrawerTitle>
                {/* <DrawerDescription>
                  Create a new note to save your thoughts.
                </DrawerDescription> */}
              </DrawerHeader>
              <div className="flex flex-col gap-4 p-4">
                <Slate
                  editor={editor}
                  initialValue={initialValue}
                  onChange={(value) => {
                    const isAsstChange = editor.operations.some(
                      (op) => op.type !== "set_selection",
                    );
                    if (isAsstChange) {
                      const content = JSON.stringify(value);
                      localStorage.setItem("content", content);
                    }
                  }}
                  
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex flex-row items-center gap-2 relative">
                    <Button
                      variant="outline"
                      style={stylesa}
                      onClick={handleActivea}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                      }}
                      
                    >
                      <BoldIcon />
                    </Button>
                    <Button
                      variant="outline"
                       style={stylesb}
                      onClick={handleActiveb}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleItalicMark(editor);
                      }}
                    >
                      <ItalicIcon />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesc}
                      onClick={handleActivec}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleUnderlineMark(editor);
                      }}
                    >
                      <UnderlineIcon />
                    </Button>
                    <Button
                      variant="outline"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        fileInputRef.current?.click();
                      }}
                    >
                      <ImageIcon />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylese}
                      onClick={handleActivee}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                      }}
                    >
                      <Code />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesf}
                      onClick={handleActivef}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                      }}
                    >
                      <ListOrdered />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesg}
                      onClick={handleActiveg}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                      }}
                    >
                      <ListIcon />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesh}
                      onClick={handleActiveh}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                      }}
                    >
                      <Heading1 />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesi}
                      onClick={handleActivei}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                      }}
                    >
                     <Heading2 />
                    </Button>
                    <DrawerClose>
                  <Button variant="outline" className="absolute top-0 right-0">Save <Check /></Button>
                </DrawerClose>    
                  </div>
                  <Editable
                    className="rounded-md bg-gray-100 outline-0 px-4 py-4 h-[80vh] dark:bg-[#111] overflow-y-scroll overflow-x-hidden scroll-m-0 "
                    spellCheck
                    autoFocus
                    onChange={(value) => {
                      console.log("Editor value changed:", value);
                      setNoteValue(value);
                    }}
                    onKeyDown={(event) => {
                      if (!event.ctrlKey) {
                        return;
                      }

                      switch (event.key) {
                        case "`": {
                          event.preventDefault();
                          CustomEditor.toggleCodeBlock(editor);
                          break;
                        }
                        case "b": {
                          event.preventDefault();
                          CustomEditor.toggleBoldMark(editor);

                          break;
                        }
                        case "i": {
                          event.preventDefault();
                          CustomEditor.toggleItalicMark(editor);
                          break;
                        }
                        case "u": {
                          event.preventDefault();
                          CustomEditor.toggleUnderlineMark(editor);


                          break;
                        }
                      }
                    }}
                    onPaste={(event) => {
                      CustomEditor.handlePaste(editor, event)
                    }}
                    renderLeaf={renderLeaf}
                    renderElement={renderElement}
                  />
                </Slate>
              </div>
                {/* <Button>Submit</Button> */}
                
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  );
}

export default Homepage;
