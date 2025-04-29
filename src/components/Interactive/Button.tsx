export const buttonThemes = {
  base: [
    'relative flex items-center justify-center text-base font-semibold cursor-pointer',
    'w-full gap-1.5 rounded',
    'font-sans'
  ],
  primary: 'shadow bg-blue-600 font-medium text-center align-middle text-white hover:bg-blue-500 transition-colors duration-200',
  secondary: 'font-semibold bg-gray-200 hover:bg-slate-200 shadow transition-colors duration-200 text-zinc-800 whitespace-nowrap h-11 px-3',
  plain: 'hover:bg-zinc-100 transition-all duration-300',
  outline: 'border-zinc-950/10 text-zinc-950',
  delete: 'border-red-700 bg-red-600 text-white shadow-button-secondary',
  delete_secondary: 'font-semibold bg-zinc-100 shadow-button transition-all duration-200 text-zinc-500 whitespace-nowrap hover:border-red-400 hover:bg-red-500 hover:text-red-100',
}
const ButtonSize = {
  normal: 'px-4 py-2',
  small: 'px-2 py-1'
}

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: 'primary' | 'secondary' | 'plain' | 'outline' | 'delete' | 'delete_secondary';
  size?: 'normal' | 'small';
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean
}

export default function Button(
  {children, variant = 'primary', type = 'button', size = 'normal', disabled = false,  onClick}
   : ButtonProps)
{
  const buttonClasses = `${buttonThemes.base.join(' ')} ${buttonThemes[variant]} ${ButtonSize[size]}`
  return(
    <button className={buttonClasses} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}