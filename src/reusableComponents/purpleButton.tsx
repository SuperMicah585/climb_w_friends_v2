interface purpleButtonProps {
  clickCallBack: any;
  children: React.ReactNode;
}
const PurpleButton: React.FC<purpleButtonProps> = ({
  clickCallBack,
  children,
}) => {
  return (
    <div
      onClick={() => clickCallBack()}
      className="absolute right-2 top-2 cursor-pointer rounded-lg bg-violet-500 p-2 font-semibold text-zinc-900 hover:opacity-75"
    >
      {children}
    </div>
  );
};
export default PurpleButton;
