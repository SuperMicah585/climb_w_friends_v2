interface purpleButtonProps {
  clickCallBack?: any;
  children: React.ReactNode;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  roundedCorners?: string;
  color?: string;
}
const PurpleButton: React.FC<purpleButtonProps> = ({
  clickCallBack,
  children,
  paddingLeft,
  paddingRight,
  roundedCorners,
  paddingBottom,
  paddingTop,
  color,
}) => {
  return (
    <div
      onClick={clickCallBack ? () => clickCallBack() : undefined}
      className={`cursor-pointer items-center justify-center text-center text-xs ${color ? `${color} border-b-4 border-green-700` : 'flex border-b-2 border-violet-600 bg-violet-500'} p-2 ${paddingBottom ? paddingBottom : ''} ${paddingTop ? paddingTop : ''} ${roundedCorners ? roundedCorners : 'rounded-lg'} ${paddingLeft ? paddingLeft : ''} ${paddingRight ? paddingRight : ''} font-semibold text-zinc-900 hover:opacity-90`}
    >
      {children}
    </div>
  );
};
export default PurpleButton;
