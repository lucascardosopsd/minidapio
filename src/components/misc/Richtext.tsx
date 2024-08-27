import ReactQuill from "react-quill";

interface RichTextEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const RichTextEditor = ({ onChange, value }: RichTextEditorProps) => {
  return (
    <ReactQuill
      theme="bubble"
      onChange={onChange}
      style={{ height: "220px", width: "100%" }}
      value={value}
      className="text-foreground text-start border border-border rounded-lg"
    />
  );
};

export default RichTextEditor;
