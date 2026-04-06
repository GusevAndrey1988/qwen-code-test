import { useState, useEffect } from 'react';
import { Button, Input, Checkbox, Select, Textarea } from '../atoms';
import './FieldConfigPanel.css';

export function FieldConfigPanel({ field, onUpdate, onClose }) {
  const [config, setConfig] = useState({ ...field });

  useEffect(() => {
    setConfig({ ...field });
  }, [field]);

  const handleChange = (key, value) => {
    const updated = { ...config, [key]: value };
    setConfig(updated);
    onUpdate(field.id, updated);
  };

  const handleOptionsChange = (value) => {
    const options = value.split('\n').filter(opt => opt.trim() !== '');
    handleChange('options', options);
  };

  if (!field) return null;

  const commonFields = (
    <>
      <div className="config-group">
        <label>Название поля (label)</label>
        <Input
          type="text"
          value={config.label || ''}
          onChange={(e) => handleChange('label', e.target.value)}
          placeholder="Введите название поля"
        />
      </div>

      <div className="config-group">
        <label>Имя поля (name)</label>
        <Input
          type="text"
          value={config.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="field_name"
        />
      </div>

      <div className="config-group">
        <label>Плейсхолдер</label>
        <Input
          type="text"
          value={config.placeholder || ''}
          onChange={(e) => handleChange('placeholder', e.target.value)}
          placeholder="Введите текст подсказки"
        />
      </div>

      <div className="config-group checkbox-group">
        <Checkbox
          checked={config.required || false}
          onChange={(e) => handleChange('required', e.target.checked)}
        />
        <label>Обязательное поле</label>
      </div>
    </>
  );

  const renderSpecificFields = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <>
            {commonFields}
            <div className="config-group">
              <label>Количество строк</label>
              <Input
                type="number"
                value={config.rows || 4}
                onChange={(e) => handleChange('rows', parseInt(e.target.value) || 4)}
                min="1"
                max="20"
              />
            </div>
          </>
        );

      case 'select':
      case 'radio':
        return (
          <>
            {commonFields}
            <div className="config-group">
              <label>Опции (каждая с новой строки)</label>
              <Textarea
                value={(config.options || []).join('\n')}
                onChange={(e) => handleOptionsChange(e.target.value)}
                placeholder="Опция 1&#10;Опция 2&#10;Опция 3"
                rows={5}
              />
            </div>
          </>
        );

      case 'checkbox':
        return (
          <>
            <div className="config-group">
              <label>Название (label)</label>
              <Input
                type="text"
                value={config.label || ''}
                onChange={(e) => handleChange('label', e.target.value)}
                placeholder="Текст согласия"
              />
            </div>
            <div className="config-group">
              <label>Имя поля (name)</label>
              <Input
                type="text"
                value={config.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="checkbox_name"
              />
            </div>
            <div className="config-group checkbox-group">
              <Checkbox
                checked={config.required || false}
                onChange={(e) => handleChange('required', e.target.checked)}
              />
              <label>Обязательное поле</label>
            </div>
          </>
        );

      case 'number':
        return (
          <>
            {commonFields}
            <div className="config-row">
              <div className="config-group">
                <label>Минимум</label>
                <Input
                  type="number"
                  value={config.min || ''}
                  onChange={(e) => handleChange('min', e.target.value)}
                  placeholder="Min"
                />
              </div>
              <div className="config-group">
                <label>Максимум</label>
                <Input
                  type="number"
                  value={config.max || ''}
                  onChange={(e) => handleChange('max', e.target.value)}
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="config-group">
              <label>Шаг</label>
              <Input
                type="number"
                value={config.step || '1'}
                onChange={(e) => handleChange('step', e.target.value)}
                placeholder="1"
              />
            </div>
          </>
        );

      case 'text':
      case 'email':
      case 'password':
      case 'tel':
        return (
          <>
            {commonFields}
            <div className="config-group">
              <label>Максимальная длина</label>
              <Input
                type="number"
                value={config.maxLength || ''}
                onChange={(e) => handleChange('maxLength', e.target.value)}
                placeholder="Max length"
              />
            </div>
          </>
        );

      default:
        return commonFields;
    }
  };

  return (
    <div className="field-config-panel">
      <div className="config-header">
        <h3>Настройка поля</h3>
        <Button onClick={onClose} variant="secondary" size="small">
          ✕
        </Button>
      </div>

      <div className="config-content">
        <div className="config-section">
          <span className="section-badge">{field.type}</span>
        </div>

        {renderSpecificFields()}
      </div>
    </div>
  );
}
