interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  options: Option[];
  required?: boolean;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function SelectInput({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  error,
}: SelectInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
} 