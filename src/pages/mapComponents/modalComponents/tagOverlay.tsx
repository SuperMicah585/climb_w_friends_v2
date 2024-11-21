interface TagOverlayProps {}

const TagOverlay: React.FC<TagOverlayProps> = () => {
  return (
    <>
      <div
        className="pointer-events-none absolute z-20 flex h-screen w-screen items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-auto fixed z-10 flex h-1/2 min-h-96 w-1/2 min-w-96 max-w-[700px] flex-col items-start rounded-lg bg-zinc-900">
          sdfskldfjskldj
        </div>
      </div>
    </>
  );
};
export default TagOverlay;
