import { useState, useCallback } from 'react';
import { FormField, FieldControls } from '../molecules';
import { Button } from '../atoms';
import './FormBuilder.css';

export function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formTitle, setFormTitle] = useState('Моя форма');

  const generateId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addField = useCallback((type) => {
    const fieldLabels = {
      text: 'Текстовое поле',
      email: 'Email',
      password: 'Пароль',
      number: 'Число',
      tel: 'Телефон',
      textarea: 'Текст',
      select: 'Выберите опцию',
      checkbox: 'Согласие',
      radio: 'Опция',
      date: 'Дата',
      file: 'Файл',
    };

    const newField = {
      id: generateId(),
      type,
      name: `${type}_${fields.length + 1}`,
      label: fieldLabels[type] || 'Поле',
      placeholder: `Введите ${fieldLabels[type]?.toLowerCase() || 'значение'}`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Опция 1', 'Опция 2', 'Опция 3'] : undefined,
    };

    setFields([...fields, newField]);
    setFormValues({ ...formValues, [newField.id]: '' });
  }, [fields, formValues]);

  const removeField = useCallback((fieldId) => {
    setFields(fields.filter(f => f.id !== fieldId));
    const newValues = { ...formValues };
    delete newValues[fieldId];
    setFormValues(newValues);
  }, [fields, formValues]);

  const moveField = useCallback((index, direction) => {
    const newFields = [...fields];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= fields.length) return;
    
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    setFields(newFields);
  }, [fields]);

  const updateFieldValue = useCallback((fieldId, value) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  const updateFieldConfig = useCallback((fieldId, updates) => {
    setFields(fields.map(f => 
      f.id === fieldId ? { ...f, ...updates } : f
    ));
  }, [fields]);

  const generateHTML = useCallback(() => {
    const fieldsHTML = fields.map(field => {
      const requiredAttr = field.required ? ' required' : '';
      
      switch (field.type) {
        case 'textarea':
          return `
    <div class="form-group">
      <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
      <textarea id="${field.name}" name="${field.name}" placeholder="${field.placeholder}"${requiredAttr}></textarea>
    </div>`;
        
        case 'select':
          return `
    <div class="form-group">
      <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
      <select id="${field.name}" name="${field.name}"${requiredAttr}>
        <option value="">Выберите опцию</option>
        ${field.options?.map(opt => `<option value="${opt}">${opt}</option>`).join('\n        ')}
      </select>
    </div>`;
        
        case 'checkbox':
          return `
    <div class="form-group">
      <label class="checkbox-label">
        <input type="checkbox" name="${field.name}"${requiredAttr}>
        <span>${field.label}</span>
      </label>
    </div>`;
        
        case 'radio':
          return `
    <div class="form-group">
      <label>${field.label}${field.required ? ' *' : ''}</label>
      <div class="radio-group">
        ${field.options?.map((opt, i) => `
        <label class="radio-option">
          <input type="radio" name="${field.name}" value="${opt}"${i === 0 ? ' checked' : ''}${requiredAttr}>
          <span>${opt}</span>
        </label>`).join('')}
      </div>
    </div>`;
        
        default:
          return `
    <div class="form-group">
      <label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>
      <input type="${field.type}" id="${field.name}" name="${field.name}" placeholder="${field.placeholder}"${requiredAttr}>
    </div>`;
      }
    }).join('');

    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTitle}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 40px 20px; }
    .form-container { max-width: 500px; margin: 0 auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
    h1 { color: #1e293b; margin-bottom: 24px; font-size: 24px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; font-size: 14px; }
    input, select, textarea { width: 100%; padding: 10px 12px; border: 2px solid #e2e8f0; border-radius: 6px; font-size: 14px; transition: all 0.2s; outline: none; }
    input:focus, select:focus, textarea:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.1); }
    textarea { resize: vertical; min-height: 100px; }
    .checkbox-label, .radio-option { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .checkbox-label input, .radio-option input { width: auto; }
    button[type="submit"] { width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
    button[type="submit"]:hover { transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="form-container">
    <h1>${formTitle}</h1>
    <form>
      ${fieldsHTML}
      <button type="submit">Отправить</button>
    </form>
  </div>
</body>
</html>`;
  }, [fields, formTitle]);

  const downloadForm = useCallback(() => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formTitle.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [generateHTML, formTitle]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generateHTML());
    alert('HTML код скопирован в буфер обмена!');
  }, [generateHTML]);

  return (
    <div className="form-builder">
      <div className="builder-header">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="form-title-input"
          placeholder="Название формы"
        />
        <div className="header-actions">
          <Button onClick={copyToClipboard} variant="secondary">
            📋 Копировать HTML
          </Button>
          <Button onClick={downloadForm} variant="success" disabled={fields.length === 0}>
            💾 Скачать форму
          </Button>
        </div>
      </div>

      <div className="builder-content">
        <div className="controls-panel">
          <FieldControls onAddField={addField} />
          
          {fields.length > 0 && (
            <div className="form-actions">
              <Button onClick={() => setFields([])} variant="danger">
                🗑️ Очистить все поля
              </Button>
            </div>
          )}
        </div>

        <div className="preview-panel">
          <div className="preview-header">
            <h2>Конструктор формы</h2>
            <span className="field-count">{fields.length} полей</span>
          </div>
          
          {fields.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <p>Добавьте поля для начала создания формы</p>
            </div>
          ) : (
            <div className="fields-list">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formValues[field.id] || ''}
                  onChange={updateFieldValue}
                  onRemove={() => removeField(field.id)}
                  onMoveUp={() => moveField(index, -1)}
                  onMoveDown={() => moveField(index, 1)}
                  isFirst={index === 0}
                  isLast={index === fields.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
