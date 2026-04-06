import { Input, Button } from '../atoms';
import './FormField.css';

export function FormField({ 
  field, 
  value, 
  onChange, 
  onRemove, 
  onMoveUp, 
  onMoveDown,
  onEdit,
  isFirst,
  isLast
}) {
  const handleChange = (e) => {
    onChange(field.id, e.target.value);
  };
  
  const handleCheckboxChange = (e) => {
    onChange(field.id, e.target.checked ? 'yes' : '');
  };
  
  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
            className="field-input"
          />
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
            className="field-input"
          >
            <option value="">Выберите опцию</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={value === 'yes'}
              onChange={handleCheckboxChange}
            />
            <span>{field.label}</span>
          </label>
        );
      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  checked={value === opt}
                  onChange={handleChange}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            step={field.step}
            maxLength={field.maxLength}
            className="field-input"
          />
        );
    }
  };

  return (
    <div className="form-field">
      <div className="field-header">
        <span className="field-type">{field.type}</span>
        <div className="field-actions">
          <button 
            onClick={onEdit} 
            className="action-btn edit"
            title="Настроить поле"
          >
            ⚙️
          </button>
          <button 
            onClick={onMoveUp} 
            disabled={isFirst}
            className="action-btn"
            title="Переместить вверх"
          >
            ↑
          </button>
          <button 
            onClick={onMoveDown} 
            disabled={isLast}
            className="action-btn"
            title="Переместить вниз"
          >
            ↓
          </button>
          <button 
            onClick={onRemove} 
            className="action-btn remove"
            title="Удалить поле"
          >
            ×
          </button>
        </div>
      </div>
      {field.type !== 'checkbox' && field.type !== 'radio' && (
        <label className="field-label">
          {field.label}{field.required && '*'}
        </label>
      )}
      {renderInput()}
    </div>
  );
}
