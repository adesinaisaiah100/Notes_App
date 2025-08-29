"use client";
import { Button } from "@/components/ui/button";
import {
  Check,
  Heading1,
  Heading2,
  ListIcon,
  ListOrdered,
  PlusCircle,
  // PencilIcon (unused)
  Trash,
  Pencil,
} from "lucide-react";
import { BotIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // assuming you have Input component

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription, DrawerFooter (unused)
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
// removed unused imports
import {
  BoldIcon,
  UnderlineIcon,
  Code,
  ItalicIcon,
  ImageIcon,
} from "lucide-react";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element,
  Transforms,
} from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps } from "slate-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import AI from "./AI/ai"

// type ApiNoteResponse = Note | Note[]; (unused)

type CustomElement = {
  type:
    | "code"
    | "paragraph"
    | "heading-one"
    | "heading-two"
    | "list-item"
    | "ordered-list"
    | "unordered-list"
    | "image";
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

type Note = {
  _id: string;
  userId: string;
  author: string;
  title: string;
  content: Descendant[]; // Use Slate's Descendant type for content
  createdAt: string;
  updatedAt: string;
};



function Homepage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editorContent, setEditorContent] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  useEffect(() => {
    if (!session) return;
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/notes");
        if (!res.ok) throw new Error("Failed to fetch notes");
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [session]);

  const handleSave = async () => {
    try {
      const content = editor.children;
      const res = await fetch(
        editingNote ? `/api/notes/${editingNote._id}` : "/api/notes",
        {
          method: editingNote ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        },
      );

      if (!res.ok) throw new Error("Failed to save note");
      const savedNote = await res.json();

      if (editingNote) {
        setNotes((prev) =>
          prev.map((n) => (n._id === savedNote._id ? savedNote : n)),
        );
        setEditingNote(null);
      } else {
        setNotes((prev) => [savedNote, ...prev]);
      }

      setTitle("");
      editor.children = [{ type: "paragraph", children: [{ text: "" }] }];
      setEditorContent(editor.children);
      setDrawerOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error saving note");
    }
  };

  const renderNotePreview = (content: Descendant[]) => {
    if (!Array.isArray(content))
      return <span className="text-xs text-gray-600">Invalid content</span>;
    try {
      return content.map((node, idx) => {
        if (!Element.isElement(node) || !Array.isArray(node.children))
          return null;
        return node.children.map((child, cIdx) => (
          <span key={`${idx}-${cIdx}`} className="text-xs text-gray-600">
            {child.text || ""}
          </span>
        ));
      });
    } catch {
      return <span className="text-xs text-gray-600">Invalid content</span>;
    }
  };

  const [isActivea, setIsActivea] = useState(false);
  const [isActiveb, setIsActiveb] = useState(false);
  const [isActivec, setIsActivec] = useState(false);
  const [isActivee, setIsActivee] = useState(false);
  const [isActivef, setIsActivef] = useState(false);
  const [isActiveg, setIsActiveg] = useState(false);
  const [isActiveh, setIsActiveh] = useState(false);
  const [isActivei, setIsActivei] = useState(false);

  function handleActivea() {
    setIsActivea((item) => !item);
  }
  function handleActiveb() {
    setIsActiveb((item) => !item);
  }
  function handleActivec() {
    setIsActivec((item) => !item);
  }

  function handleActivee() {
    setIsActivee((item) => !item);
  }
  function handleActivef() {
    setIsActivef((item) => !item);
  }
  function handleActiveg() {
    setIsActiveg((item) => !item);
  }
  function handleActiveh() {
    setIsActiveh((item) => !item);
  }
  function handleActivei() {
    setIsActivei((item) => !item);
  }

  const stylesa = isActivea
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylesb = isActiveb
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylesc = isActivec
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylese = isActivee
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylesf = isActivef
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylesg = isActiveg
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylesh = isActiveh
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
  const stylesi = isActivei
    ? {
        backgroundColor: "#222",
      }
    : {
        backgroundColor: "",
      };
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
    handlePaste(editor: Editor, event: React.ClipboardEvent<HTMLDivElement>) {
      const text = event.clipboardData?.getData("text/plain");

      console.log("onPaste", text);
    },

  isBoldMarkActive(editor: Editor) {
      const marks = Editor.marks(editor);
      return marks ? marks.bold === true : false;
    },

  isUnderlineMarkActive(editor: Editor) {
      const marks = Editor.marks(editor);
      return marks ? marks.underline === true : false;
    },

  isItalicMarkActive(editor: Editor) {
      const marks = Editor.marks(editor);
      return marks ? marks.italic === true : false;
    },

  isHeading1Active(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "heading-one",
      });
      return !!match;
    },
  isHeading2Active(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "heading-two",
      });
      return !!match;
    },

  isOrderedListActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "ordered-list",
      });
      return !!match;
    },

  isUnorderedListActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "unordered-list",
      });
      return !!match;
    },

  isListItemActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "list-item",
      });
      return !!match;
    },

  isCodeBlockActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "code",
      });

      return !!match;
    },

  insertImage(editor: Editor, url: string) {
      const text = { text: "" };
      const image: CustomElement = { type: "image", url, children: [text] };
      Transforms.insertNodes(editor, image);
    },

  toggleBoldMark(editor: Editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "bold");
      } else {
        Editor.addMark(editor, "bold", true);
      }
    },

  toggleCodeBlock(editor: Editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? "paragraph" : "code" },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      );
    },

  toggleHeading1(editor: Editor) {
      const isActive = CustomEditor.isHeading1Active(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? "paragraph" : "heading-one" },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      );
    },

  toggleHeading2(editor: Editor) {
      const isActive = CustomEditor.isHeading2Active(editor);
      Transforms.setNodes(
        editor,
        { type: isActive ? "paragraph" : "heading-two" },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      );
    },

  toggleListItem(editor: Editor) {
      const isActive = CustomEditor.isListItemActive(editor);
      Transforms.setNodes(
        editor,
        {
          type: isActive ? "paragraph" : "list-item",
          children: [{ text: "" }],
        },
        { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
      );
    },

  toggleUnderlineMark(editor: Editor) {
      const isActive = CustomEditor.isUnderlineMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "underline");
      } else {
        Editor.addMark(editor, "underline", true);
      }
    },

  toggleItalicMark(editor: Editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor);
      if (isActive) {
        Editor.removeMark(editor, "italic");
      } else {
        Editor.addMark(editor, "italic", true);
      }
    },

  toggleOrderedList(editor: Editor) {
      const isActive = CustomEditor.isOrderedListActive(editor);

      if (isActive) {
        // Convert back to paragraph
        Transforms.unwrapNodes(editor, {
          match: (n) => Element.isElement(n) && n.type === "ordered-list",
          split: true,
        });
        Transforms.setNodes(editor, { type: "paragraph" });
      } else {
        // Convert to list item first, then wrap in ordered list
        Transforms.setNodes(editor, { type: "list-item" });
        Transforms.wrapNodes(editor, { type: "ordered-list", children: [] });
      }
    },

  toggleUnorderedList(editor: Editor) {
      const isActive = CustomEditor.isUnorderedListActive(editor);

      if (isActive) {
        // Convert back to paragraph
        Transforms.unwrapNodes(editor, {
          match: (n) => Element.isElement(n) && n.type === "unordered-list",
          split: true,
        });
        Transforms.setNodes(editor, { type: "paragraph" });
      } else {
        // Convert to list item first, then wrap in unordered list
        Transforms.setNodes(editor, { type: "list-item" });
        Transforms.wrapNodes(editor, { type: "unordered-list", children: [] });
      }
    },
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { url } = await res.json();
      CustomEditor.insertImage(editor, url);
    } else {
      alert("Error uploading image");
    }

    event.target.value = "";
  };

  const renderLeaf = useCallback((props: RenderLeafProps) => {
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
  const renderElement = useCallback((props: RenderElementProps) => {
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
        if (!url || typeof url !== "string") {
          return (
            <div {...props.attributes}>
              <div contentEditable={false} style={{ userSelect: "none" }}>
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                  Image not available
                </div>
              </div>
              {props.children}
            </div>
          );
        }

        return (
          <div {...props.attributes}>
            <div contentEditable={false} style={{ userSelect: "none" }}>
              <Image src={url} alt={alt || ""} className="block max-h-80 max-w-full" />
            </div>
            {props.children}
          </div>
        );
      }
      case "heading-one":
        return (
          <h1 {...props.attributes} className="text-2xl font-bold">
            {props.children}
          </h1>
        );
      case "heading-two":
        return (
          <h2 {...props.attributes} className="text-xl font-semibold">
            {props.children}
          </h2>
        );
      case "ordered-list":
        return (
          <ol
            {...props.attributes}
            style={{ paddingLeft: "24px", listStyleType: "decimal" }}
          >
            {props.children}
          </ol>
        );
      case "unordered-list":
        return (
          <ul
            {...props.attributes}
            style={{ paddingLeft: "24px", listStyleType: "disc" }}
          >
            {props.children}
          </ul>
        );
      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (editor.children.length > 1 || editor.children[0].children[0].text) {
  //       handleSave(); // Call save function periodically
  //     }
  //   }, 30000); // Every 30 seconds
  //   return () => clearInterval(interval);
  // }, [editor.children, title, editingNote]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-end gap-4">
          <Drawer>
            <DrawerTrigger className="focus-visible:ring-ring border-input mt-4 flex h-9 w-[120px] items-center justify-center gap-2 rounded-md border bg-black px-3 text-sm font-medium whitespace-nowrap text-gray-100 shadow-sm transition-colors hover:bg-[#444] hover:text-white focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-green-300 dark:text-gray-200 dark:hover:bg-[#111]">
              <span>
                <BotIcon />
              </span>
              Ask Ai
            </DrawerTrigger>
            <DrawerContent className="h-[70vh] min-h-[70vh] border-t-1 border-t-gray-500 bg-white dark:bg-[#000]">
              <AI notes={notes} />
            </DrawerContent>
          </Drawer>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="focus-visible:ring-ring border-input hover:bg-[#111]/3 hover:white mt-4 flex h-9 w-[120px] items-center justify-center gap-2 rounded-md border bg-[#111]/6 text-[#222] px-3 text-sm font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-green-300 dark:text-gray-900 dark:hover:bg-green-200">
                <PlusCircle /> New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-accent dark:bg-[#000] *:focus { outline: none; } *:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }">
              <DialogHeader>
                <DialogTitle>New Note</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/2 focus-visible:ring-ring focus-visible:ring-1 w-full"
              />
              <DialogFooter>
                <Button
                  onClick={() => {
                    if (!title) return alert("Please enter a title");
                    setIsDialogOpen(false);
                    setDrawerOpen(true);
                    // Open the drawer editor for creating
                  }}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerContent className="max-h-[100vh] bg-white dark:bg-[#000]">
              <DrawerHeader>
                <DrawerTitle className="text-lg">
                  {editingNote ? "Edit Note" : "New Note"}
                </DrawerTitle>
                {/* <DrawerDescription>
                  Create a new note to save your thoughts.
                </DrawerDescription> */}
              </DrawerHeader>
              <div className="flex flex-col gap-4 p-4">
                <Slate
                  editor={editor}
                  initialValue={editorContent}
                  key={editingNote?._id || 'new'}
                  onChange={(value) => {
                    const isAsstChange = editor.operations.some(
                      (op) => op.type !== "set_selection",
                    );
                    if (isAsstChange) {
                      const content = JSON.stringify(value);
                      console.log("Content saved:", content);

                      // Save to localStorage or any other storage
                      // This is where you can save the content to a database or local storage
                      // For example:
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
                  <div className="relative flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-row gap-2 max-sm:overflow-x-scroll pb-2 w-80  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    <Button
                      variant="outline"
                      style={stylesa}
                      aria-label="Toggle bold"
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
                      aria-label="Toggle italic"
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
                      aria-label="Toggle underline"
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
                      aria-label="Insert image"
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
                      aria-label="Toggle code block"
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
                      aria-label="Toggle list item"
                      onClick={handleActivef}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleOrderedList(editor);
                      }}
                    >
                      <ListOrdered />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesg}
                      aria-label="Toggle unordered list"
                      onClick={handleActiveg}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleUnorderedList(editor);
                      }}
                    >
                      <ListIcon />
                    </Button>
                    <Button
                      variant="outline"
                      style={stylesh}
                      aria-label="Toggle heading 1"
                      onClick={handleActiveh}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleHeading1(editor);
                      }}
                    >
                      <Heading1 />
                    </Button>
                    <Button
                      variant="outline"
                      aria-label="Toggle heading 2"
                      style={stylesi}
                      onClick={handleActivei}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleHeading2(editor);
                      }}
                    >
                      <Heading2 />
                    </Button>
                    </div>
                    <DrawerClose
                      onClick={handleSave}
                      className="focus-visible:ring-ring border-input bg-black hover:bg-[#fff] hover:text-accent-foreground absolute top-0 right-0 inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium whitespace-nowrap shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {editingNote ? "Update Note" : "Save Note"}
                      <Check size={16} />
                    </DrawerClose>
                  </div>
                  <Editable
                    className="h-[80vh] scroll-m-0 overflow-x-hidden overflow-y-scroll rounded-md bg-gray-100 px-4 py-4 outline-0 dark:bg-[#111]"
                    spellCheck
                    autoFocus
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
                      CustomEditor.handlePaste(editor, event);
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

        <div>
          {loading && (
            <div className="p-4 text-sm text-gray-500">Loading notes...</div>
          )}
          <ul className="mt-12 grid grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-1">
            {notes.map((note) => (
              <li
                key={note._id}
                className="hover:bg-gray-[#222] flex flex-1 items-center justify-between rounded-lg border border-gray-600 p-3"
              >
                <div>
                  <div className="font-semibold">{note.title}</div>
                  <div className="text-xs text-gray-500">
                    {note.author} • {new Date(note.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-1 max-h-10 flex-1 overflow-y-hidden overflow-x-hidden text-sm text-gray-600 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    {renderNotePreview(note.content)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingNote(note);
                      setTitle(note.title);
                      setDrawerOpen(true);
                      const content = Array.isArray(note.content) && note.content.length > 0
                        ? (note.content as Descendant[])
                        : [{ type: "paragraph", children: [{ text: "" }] } as Descendant];
                      setEditorContent(content as Descendant[]);
                    }}
                    className="bg-[#111] hover:text-accent-foreground hover:bg-[#222]"
                    variant="outline"
                  >
                    <Pencil fill="#fff" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      await fetch(`/api/notes/${note._id}`, {
                        method: "DELETE",
                      });
                      setNotes((prev) =>
                        prev.filter((n) => n._id !== note._id),
                      );
                    }}
                    className="bg-[#111] hover:text-accent-foreground hover:bg-[#222]"
                  >
                    <Trash />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Homepage;
