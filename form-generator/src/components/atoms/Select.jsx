import './Select.css';

export function Select({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  required = false,
  placeholder = 'Выберите опцию'
}) {
  return (
    <div className="select-wrapper">
      {label && <label htmlFor={name}>{label}{required && '*'}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
