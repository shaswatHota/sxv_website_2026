interface Props {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  className?: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
  id,
  name,
  type = "text",
  placeholder,
  value,
  className = "",
  autoComplete,
  onChange,
}: Props) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 ${className}`}
    />
  );
}
