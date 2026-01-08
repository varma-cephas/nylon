export default function Button({
  name,
  className,
  disabled,
  handleClick,
}: {
  name: string
  className?: string
  disabled?: boolean
  handleClick?: () => void
}) {
  return (
    <button
      className={`border w-full p-2 ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}
