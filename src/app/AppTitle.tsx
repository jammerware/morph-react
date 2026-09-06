export default function AppTitle({ title }: { title?: string }) {
  const builtTitle = title ? `${title} | Morph Chinese` : "Morph Chinese";
  return <title>{builtTitle}</title>;
}
