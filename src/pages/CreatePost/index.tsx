import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Strikethrough,
  Baseline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code2,
  Undo2,
  Redo2,
  LinkIcon,
  Eye,
  EyeOff,
  ImagePlus,
} from "lucide-react";
import Heading from "@tiptap/extension-heading";
import TextStyle from "@tiptap/extension-text-style"; // Bắt buộc để dùng màu
import Color from "@tiptap/extension-color";
//@ts-ignore
import { ChromePicker } from "react-color";
import { useEffect, useRef, useState } from "react";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { addRandomIdsToHeadings, Toast } from "../../utils";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import { createPost } from "../../services";

Heading.configure({
  levels: [1, 2, 3],
});

const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          return {
            style: attributes.style || null,
          };
        },
      },
    };
  },
});

const TEXT_PLACEHOLDER = "Soạn nội dung tại đây...";
const CreatePost = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        paragraph: {
          HTMLAttributes: {
            style: "color: white",
          },
        },
        heading: {
          HTMLAttributes: {
            style: "color: white",
          },
        },
      }),
      TextStyle.configure({
        //@ts-ignore
        types: ["textStyle"], // Đảm bảo extension này được thêm vào
      }),
      Color.configure({
        types: ["textStyle", "listItem"], // đây là chìa khóa!
      }),
      BulletList,
      OrderedList.configure({
        HTMLAttributes: {
          style: "color: white;",
        },
      }),
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"], // Áp dụng align cho heading và paragraph
      }),
      Placeholder.configure({
        placeholder: TEXT_PLACEHOLDER,
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
      }),
      Image,
      ImageResize,
      CustomOrderedList,
    ],
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Tab") {
          event.preventDefault();

          const { state, dispatch } = view;
          const { selection } = state;
          const { from, to, $from } = selection;

          const lineStart = $from.start();

          // Chèn 2 khoảng trắng ở đầu dòng
          const tr = state.tr.insertText("  ", lineStart);

          // Tính toán lại vùng chọn sau khi đã chèn
          const offset = 2; // số ký tự đã chèn
          const newFrom = from + (from > lineStart ? offset : 0);
          const newTo = to + (to > lineStart ? offset : 0);

          tr.setSelection(
            //@ts-ignore
            state.selection.constructor.create(tr.doc, newFrom, newTo)
          );

          dispatch(tr);
          return true;
        }

        return false;
      },
      handlePaste: (view, event) => {
        const clipboardData = event.clipboardData;
        if (clipboardData) {
          // Làm một việc gì đó với dữ liệu clipboard trước khi dán
          const plainText = clipboardData.getData("text/plain");
          const htmlText = clipboardData.getData("text/html");

          // Giữ nguyên màu sắc khi dán nội dung
          view.dispatch(
            view.state.tr.insertText(plainText, view.state.selection.from)
          );
          return true;
        }
        return false;
      },
    },
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const colorPickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState("");

  // Hàm này sẽ đóng bảng màu khi người dùng click ra ngoài
  const handleClickOutside = (event: MouseEvent) => {
    // Kiểm tra xem người dùng có bấm ngoài nút hoặc bảng màu không
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowColorPicker(false);
    }
  };
  // Thêm event listener khi component mount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // mới zô chọn màu text mặc định là màu trắng
    // handleColorChange({ hex: color });

    // Clean up listener khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleColorChange = (newColor: any) => {
    setColor(newColor.hex);
    if (editor) {
      editor.chain().focus().setColor(newColor.hex).run();
    }
  };

  //   Chèn hình
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    try {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        editor
          ?.chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
      };
      reader.readAsDataURL(file);
    } catch (error) {
    } finally {
    }
  };

  const renderTitle = () => {
    return (
      <div className="w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề"
          className="text-base w-full outline-offset-0 mt-1 px-2 text-white h-12 border-1 border-dim-border focus:border-gray-500 focus:outline focus:outline-gray-300 focus:outline-1 outline-none rounded-lg bg-gray-700"
        />
      </div>
    );
  };

  const renderRichText = () => {
    if (!editor) return null;
    return (
      <div className="w-full mt-4 border-1 border-dim-border rounded-lg bg-gray-700">
        {/* Toolbar */}
        <div className="flex gap-2 border-b border-dim-border px-3 py-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("bold") ? "bg-gray-300" : ""
            }`}
          >
            <Bold
              color={`${editor.isActive("bold") ? "black" : "white"}`}
              size={18}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("italic") ? "bg-gray-300" : ""
            }`}
          >
            <Italic
              color={`${editor.isActive("italic") ? "black" : "white"}`}
              size={18}
            />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("strike") ? "bg-gray-300" : ""
            }`}
          >
            <Strikethrough
              color={`${editor.isActive("strike") ? "black" : "white"}`}
              size={18}
            />
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-300 text-black"
                : "text-white"
            }`}
          >
            H1
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("heading", { level: 2 })
                ? "bg-gray-300 text-black"
                : "text-white"
            }`}
          >
            H2
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("heading", { level: 3 })
                ? "bg-gray-300 text-black"
                : "text-white"
            }`}
          >
            H3
          </button>

          {/* Nút bấm để mở bảng màu */}
          <button
            ref={buttonRef}
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`p-1 rounded hover:bg-gray-200`}
          >
            <Baseline color={color} size={22} className="" />
          </button>

          {/* Hiển thị bảng màu khi bấm */}
          {showColorPicker && (
            <div ref={colorPickerRef} className="absolute z-10">
              <ChromePicker
                color={color}
                onChangeComplete={handleColorChange}
              />
            </div>
          )}

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("bulletList") ? "bg-gray-300" : ""
            }`}
          >
            <List
              color={`${editor.isActive("bulletList") ? "black" : "white"}`}
              size={22}
              className=""
            />
          </button>

          <button
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("orderedList") ? "bg-gray-300" : ""
            }`}
          >
            <ListOrdered
              color={`${editor.isActive("orderedList") ? "black" : "white"}`}
              size={22}
              className=""
            />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
            }`}
          >
            <AlignLeft
              color={editor.isActive({ textAlign: "left" }) ? "black" : "white"}
              size={18}
            />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
            }`}
          >
            <AlignCenter
              color={
                editor.isActive({ textAlign: "center" }) ? "black" : "white"
              }
              size={18}
            />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
            }`}
          >
            <AlignRight
              color={
                editor.isActive({ textAlign: "right" }) ? "black" : "white"
              }
              size={18}
            />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor.isActive("codeBlock") ? "bg-gray-300" : ""
            }`}
          >
            <Code2
              color={editor.isActive("codeBlock") ? "black" : "white"}
              size={18}
            />
          </button>

          <button
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("Nhập đường dẫn:", previousUrl || "");

              if (url === null) return; // nhấn Cancel

              if (url === "") {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();
                return;
              }

              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }}
            className="p-1 rounded hover:bg-gray-200"
          >
            <LinkIcon
              size={18}
              color={editor.isActive("link") ? "black" : "white"}
            />
          </button>

          <button
            onClick={() => {
              //   insertImage();
            }}
            className="p-1 rounded hover:bg-gray-200"
          >
            <ImagePlus size={18} color={"white"} />
          </button>

          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Undo2 color="white" size={18} />
          </button>

          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1 rounded hover:bg-gray-200"
          >
            <Redo2 color="white" size={18} />
          </button>
        </div>

        {/* Editor */}
        <div className="relative">
          {isDragging && (
            <div
              className="absolute w-full h-full flex-center"
              style={{ backgroundColor: "#0f0037" }}
            >
              <p className="font-semibold text-white">Thả hình vào đây</p>
            </div>
          )}

          <EditorContent
            editor={editor}
            className="p-4 w-full prose prose-invert relative"
            style={{ outline: "none" }}
            onDrop={handleDrop}
          />
        </div>
      </div>
    );
  };

  const validate = (content: string) => {
    console.log("tien xem content ", content);
    if (title.trim().length < 1) {
      Toast.show({ text: "Vui lòng nhập tiêu đề" });
      return false;
    } else if (content.length < 1) {
      Toast.show({ text: "Vui lòng nhập nội dung" });
      return false;
    }
    return true;
  };

  const handlePost = async (title: string, content: string) => {
    try {
      (window as any).props.showLoading();
      const res = await createPost({ title, content });
      console.log("tien xem res ", res);
      Toast.show({ text: "Tạo bài viết thành công" });
    } catch (error: any) {
      Toast.show({ text: "Tạo bài viết thất bại: " + error.message });
    } finally {
      (window as any).props.hideLoading();
    }
  };

  const onSubmit = () => {
    if (!editor) return;
    const htmlContent = addRandomIdsToHeadings(editor.getHTML());
    const content = editor.getText();
    const validateRes = validate(content);
    if (!validateRes) return;

    (window as any).props.showConfirmModal({
      content: "Bạn có chắc chắn muốn xuất bản bài viết luôn không?",
      onClick: () => {
        handlePost(title, htmlContent);
      },
    });
  };

  const renderSubmit = () => {
    return (
      <>
        <div
          onClick={() => onSubmit()}
          className="w-full py-2 bg-title text-white font-semibold text-center rounded-lg mt-4 cursor-pointer hover:opacity-80 transition-all duration-500"
        >
          Xuất bản
        </div>
        <div
          onClick={() => setIsPreview(!isPreview)}
          className="flex flex-center gap-1 w-full py-2 bg-title text-white font-semibold text-center rounded-lg mt-4 cursor-pointer hover:opacity-80 transition-all duration-500"
        >
          <span>Xem trước</span>{" "}
          <>
            {isPreview ? (
              <EyeOff size={18} color="white" />
            ) : (
              <Eye size={18} color="white" />
            )}
          </>
        </div>
      </>
    );
  };

  const renderPreview = () => {
    console.log("tien xem preview ", editor?.getHTML());
    if (!isPreview) return null;
    if (!editor) return null;
    return (
      <div
        className="p-4 bg-transparent text-black rounded prose prose-invert max-w-none mt-6 preview-container"
        dangerouslySetInnerHTML={{ __html: editor.getHTML() }} // Hiển thị HTML của editor
      />
    );
  };

  return (
    <div
      className="flex flex-1 flex-col pt-16"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      {renderTitle()}
      {renderRichText()}
      {renderSubmit()}
      {renderPreview()}
    </div>
  );
};

export default CreatePost;
