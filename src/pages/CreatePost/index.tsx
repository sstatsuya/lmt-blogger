import { EditorContent, useEditor } from "@tiptap/react";
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
import { createPost, uploadImageService } from "../../services";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
    onUpdate({ editor }) {
      const content = editor.getText();
      if (content.trim().length > 0) wrote.current = true;
      else wrote.current = false;
    },
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Tab") {
          event.preventDefault();

          const { state, dispatch } = view;
          const { from } = state.selection;

          dispatch(
            state.tr.insertText("\t", from) // chèn 2 tab vào vị trí con trỏ
          );

          return true; // đã xử lý Tab
        }

        return false; // không xử lý các phím khác
      },
      handlePaste: (view, event) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        // Nếu clipboard có HTML với <img>, thì KHÔNG xử lý upload lại nữa
        const html = clipboardData.getData("text/html");
        if (html && html.includes("<img")) {
          console.log("Đã có <img> trong HTML clipboard → bỏ qua upload ảnh");
          return false; // để trình duyệt xử lý mặc định
        }

        const items = clipboardData.items;

        // Ưu tiên kiểm tra nếu có ảnh
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (!file) continue;

            const placeholderText = "Đang upload ảnh...";
            const { from } = view.state.selection;
            const transaction = view.state.tr.insertText(placeholderText, from);
            view.dispatch(transaction);

            const uploadPos = from;

            // ❗️Tách phần async ra ngoài để tránh gán async trực tiếp
            setTimeout(async () => {
              try {
                const imageUrl = await uploadImageService(file);
                console.log("tien xem imageURL ", imageUrl);
                if (imageUrl) {
                  const node = view.state.schema.nodes.image.create({
                    src: imageUrl,
                  });

                  const tr = view.state.tr;
                  tr.replaceWith(
                    uploadPos,
                    uploadPos + placeholderText.length,
                    node
                  );
                  view.dispatch(tr);
                }
              } catch (error) {
                const errorText = "❌ Upload ảnh thất bại";

                // Xử lý mark màu nếu có
                const textColorMark = view.state.schema.marks.textColor;
                const errorNode = textColorMark
                  ? view.state.schema.text(errorText, [
                      textColorMark.create({ color: "red" }),
                    ])
                  : view.state.schema.text(errorText); // fallback nếu không có mark

                const tr = view.state.tr.replaceWith(
                  uploadPos,
                  uploadPos + placeholderText.length,
                  errorNode
                );

                view.dispatch(tr);
              }
            }, 0);

            // Sau khi xử lý ảnh, không xử lý gì thêm
            return true;
          }
        }

        // Nếu không có ảnh thì xử lý text như hiện tại
        const plainText = clipboardData.getData("text/plain");
        if (plainText) {
          console.log("tien vao plain text ", plainText);
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
  const wrote = useRef(false);

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
    const handleBeforeUnload = (e: any) => {
      if (wrote.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
      if (!editor) return Toast.show({ text: "Đã có lỗi xảy ra khi drop ảnh" });

      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files[0];
      if (!file || !file.type.startsWith("image/")) return;

      const placeholderText = "Đang upload ảnh...";

      // Lấy vị trí thả chuột trong editor
      const pos = editor?.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      })?.pos;

      if (pos == null || pos === undefined) return;

      // Chèn placeholder tại vị trí thả
      editor?.chain().focus().insertContentAt(pos, placeholderText).run();

      const uploadPos = pos;

      // Tách phần async upload ra khỏi flow xử lý chính
      setTimeout(async () => {
        try {
          const imageUrl = await uploadImageService(file);
          console.log("Upload thành công:", imageUrl);

          if (imageUrl) {
            // Tạo node ảnh từ URL
            const node = editor.schema.nodes.image.create({
              src: imageUrl,
            });

            const { state, view } = editor;
            const tr = state.tr;

            tr.replaceWith(uploadPos, uploadPos + placeholderText.length, node);
            view.dispatch(tr);
          }
        } catch (err) {
          const errorText = "❌ Upload ảnh thất bại";
          const { view } = editor;

          // Xử lý mark màu nếu có
          const textColorMark = view.state.schema.marks.textColor;
          const errorNode = textColorMark
            ? view.state.schema.text(errorText, [
                textColorMark.create({ color: "red" }),
              ])
            : view.state.schema.text(errorText); // fallback nếu không có mark

          const tr = view.state.tr.replaceWith(
            uploadPos,
            uploadPos + placeholderText.length,
            errorNode
          );

          view.dispatch(tr);
        }
      }, 0);
    } catch (error) {}
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
            <LinkIcon size={18} color={"white"} />
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
            className="p-4 w-full max-w-full prose prose-invert relative"
            style={{ outline: "none" }}
            onDrop={handleDrop}
          />
        </div>
      </div>
    );
  };

  const validate = (content: string) => {
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
      console.log("tien xem res create post ", res);
      Toast.show({ text: "Tạo bài viết thành công" });
      navigate("/post/" + res.id);
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
    if (!isPreview) return null;
    if (!editor) return null;
    return (
      <div
        className="p-4 bg-transparent text-black rounded prose prose-invert max-w-none mt-6 preview-container"
        dangerouslySetInnerHTML={{ __html: editor.getHTML() }} // Hiển thị HTML của editor
      />
    );
  };

  const renderContentCreator = () => {
    return (
      <div className="flex-center items-stretch gap-12 flex-col xl:flex-row">
        <div className="flex flex-1 flex-col">
          {renderTitle()}
          {renderRichText()}
          {renderSubmit()}
        </div>

        {isPreview && (
          <div className="flex flex-1 flex-col border-1 border-dim-border rounded-lg">
            {renderPreview()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex flex-1 flex-col pt-16"
      onDragOver={(e) => {
        e.preventDefault();
        if (e.dataTransfer.types && e.dataTransfer.types[0] === "Files") {
          setIsDragging(true);
        }
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      {renderContentCreator()}
    </div>
  );
};

export default CreatePost;
