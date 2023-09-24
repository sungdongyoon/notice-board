import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const API_KEY = process.env.NEXT_PUBLIC_IP_API_KEY;

const Tinymce = ({ handleChildValue, content }) => {
  const editorRef = useRef(null);
  const tinymcePlugins = ['lists',
  'link',
  'image',
  'charmap',
  'preview',
  'searchreplace',
  'fullscreen',
  'media',
  'table',
  'code',
  'help',
  'emoticons',
  'codesample',
  'quickbars',];
  const tinymceToolbar = 'undo redo | blocks | ' +
  'bold italic forecolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'lists table link charmap searchreplace | ' +
  'image media codesample emoticons fullscreen preview | ' +
  'removeformat | help ';
  const handleEditorChange = (content) => {
    handleChildValue(content);
  }
  const handleImageUpload = (success, failure) => {
    const uploadedImageInfo = {
      imageUrl: '이미지_경로',
      description: '이미지_설명',
    };
    success(uploadedImageInfo);
    failure({ error: 'Image upload failed' });
  };
  
  return (
    <Editor onInit={(e, editor) => (editorRef.current = editor)}
    init={{
      plugins: tinymcePlugins,
      toolbar: tinymceToolbar,
      min_height: 500,
      menubar: false,
      branding: false,
      statusbar: false,
      placeholder: "내용",
      block_formats: '제목1=h2;제목2=h3;제목3=h4;본문=p;',
      images_upload_handler: handleImageUpload,
    }}
    id="editor_id"
    value={content}
    onEditorChange={handleEditorChange}
    apiKey={API_KEY}
    />
  )
}

export default Tinymce;
