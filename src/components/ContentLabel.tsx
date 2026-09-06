type ContentLabelProps = {
  text: string;
};

export default function ContentLabel({ text }: ContentLabelProps) {
  return <dt className="text-sm font-medium text-base-content/60 tracking-widest">{text}</dt>;
}
