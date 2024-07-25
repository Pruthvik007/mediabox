type Option = {
  label: string;
  value: string;
};
type DropdownProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};
const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
  return (
    <select
      id={label}
      className="select select-bordered text-center overflow-hidden"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
