interface purpleButtonProps {
  clickCallBack?: any;
  children: React.ReactNode;
  paddingLeft?: string;
  paddingRight?: string;
  roundedCorners?: string;
  color?: string;
}
const PurpleButton: React.FC<purpleButtonProps> = ({
  clickCallBack,
  children,
  paddingLeft,
  paddingRight,
  roundedCorners,
  color,
}) => {
  return (
    <div
      onClick={clickCallBack ? () => clickCallBack() : undefined}
      className={`flex cursor-pointer items-center justify-center text-center text-xs ${color ? color : 'bg-violet-500'} p-2 ${roundedCorners ? roundedCorners : 'rounded-lg'} ${paddingLeft ? paddingLeft : ''} ${paddingRight ? paddingRight : ''} font-semibold text-zinc-900 hover:opacity-75`}
    >
      {children}
    </div>
  );
};
export default PurpleButton;
