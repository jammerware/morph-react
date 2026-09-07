type ContentLabelProps = {
  text: string;
};

export default function ContentLabel({ text }: ContentLabelProps) {
  return (
    <div className="text-sm font-medium text-base-content/60 tracking-widest mb-2">
      {text}
    </div>
  );
}
