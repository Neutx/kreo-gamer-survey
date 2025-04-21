interface TextInputProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email';
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TextInput({
  label,
  name,
  required = false,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
}: TextInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
} 