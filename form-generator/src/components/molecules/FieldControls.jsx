import { Button } from '../atoms';
import './FieldControls.css';

export function FieldControls({ onAddField }) {
  const fieldTypes = [
    { type: 'text', label: 'Текст', icon: '📝' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'password', label: 'Пароль', icon: '🔒' },
    { type: 'number', label: 'Число', icon: '🔢' },
    { type: 'tel', label: 'Телефон', icon: '📱' },
    { type: 'textarea', label: 'Текст (многостр.)', icon: '📄' },
    { type: 'select', label: 'Выпадающий список', icon: '📋' },
    { type: 'checkbox', label: 'Чекбокс', icon: '☑️' },
    { type: 'radio', label: 'Радио кнопки', icon: '🔘' },
    { type: 'date', label: 'Дата', icon: '📅' },
    { type: 'file', label: 'Файл', icon: '📎' },
  ];

  return (
    <div className="field-controls">
      <h3>Добавить поле</h3>
      <div className="field-types">
        {fieldTypes.map((fieldType) => (
          <button
            key={fieldType.type}
            onClick={() => onAddField(fieldType.type)}
            className="field-type-btn"
          >
            <span className="field-icon">{fieldType.icon}</span>
            <span>{fieldType.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
