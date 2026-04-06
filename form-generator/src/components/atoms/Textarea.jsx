import './Textarea.css';

export function Textarea({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 4
}) {
  return (
    <div className="textarea-wrapper">
      {label && <label htmlFor={name}>{label}{required && '*'}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </div>
  );
}
