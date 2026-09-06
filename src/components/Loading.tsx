export default function Loading(props: { isLoading: boolean }) {
  return props.isLoading && <progress className="progress progress-primary w-full"></progress>;
}
