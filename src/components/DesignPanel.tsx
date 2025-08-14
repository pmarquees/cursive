'use client';

import { useState, useEffect, memo } from 'react';
import { Palette, Type, Layout, Square } from 'lucide-react';

interface DesignPanelProps {
  selectedElement: {
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null;
  onStyleChange: (property: string, value: string) => void;
}

function DesignPanelComponent({ selectedElement, onStyleChange }: DesignPanelProps) {
  const [styles, setStyles] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (selectedElement?.styles) {
      const computedStyles = selectedElement.styles;
      setStyles({
        width: computedStyles.width,
        height: computedStyles.height,
        display: computedStyles.display,
        position: computedStyles.position,
        backgroundColor: computedStyles.backgroundColor,
        color: computedStyles.color,
        fontSize: computedStyles.fontSize,
        fontFamily: computedStyles.fontFamily,
        fontWeight: computedStyles.fontWeight,
        textAlign: computedStyles.textAlign,
        padding: computedStyles.padding,
        margin: computedStyles.margin,
        borderRadius: computedStyles.borderRadius,
        border: computedStyles.border,
      });
    }
  }, [selectedElement]);

  const handleStyleChange = (property: string, value: string) => {
    setStyles(prev => ({ ...prev, [property]: value }));
    onStyleChange(property, value);
  };

  const ColorInput = ({ label, property }: { label: string; property: string }) => {
    const currentValue = styles[property] || '';
    const hexValue = rgbToHex(currentValue) || '#000000';
    const [localValue, setLocalValue] = useState(currentValue);

    useEffect(() => {
      setLocalValue(currentValue);
    }, [currentValue]);

    const handleCommit = (value: string) => {
      if (value !== currentValue) {
        handleStyleChange(property, value);
      }
    };

    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={hexValue}
            onChange={(e) => handleStyleChange(property, e.target.value)} // Color picker can update immediately
            className="w-8 h-8 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={() => handleCommit(localValue)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommit(localValue);
                e.currentTarget.blur();
              }
            }}
            className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background text-foreground"
            placeholder="e.g., #ff0000, red"
          />
        </div>
      </div>
    );
  };

  const NumberInput = ({ label, property, unit = 'px' }: { label: string; property: string; unit?: string }) => {
    const currentValue = styles[property] || '';
    const numericValue = parseFloat(currentValue) || 0;
    const [localValue, setLocalValue] = useState(numericValue);

    useEffect(() => {
      setLocalValue(parseFloat(currentValue) || 0);
    }, [currentValue]);

    const handleCommit = (value: number) => {
      const newValue = `${value}${unit}`;
      if (newValue !== currentValue) {
        handleStyleChange(property, newValue);
      }
    };

    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
        <div className="flex gap-1">
          <input
            type="number"
            value={localValue}
            onChange={(e) => setLocalValue(parseFloat(e.target.value) || 0)}
            onBlur={() => handleCommit(localValue)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommit(localValue);
                e.currentTarget.blur();
              }
            }}
            className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background text-foreground"
          />
          <span className="text-xs text-muted-foreground px-2 py-1">{unit}</span>
        </div>
      </div>
    );
  };

  const SelectInput = ({ label, property, options }: { label: string; property: string; options: { value: string; label: string }[] }) => {
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
        <select
          value={styles[property] || ''}
          onChange={(e) => handleStyleChange(property, e.target.value)}
          className="w-full px-2 py-1 text-xs border border-border rounded bg-background text-foreground"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  };

  // Helper function to convert RGB to hex
  function rgbToHex(rgb: string): string | null {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null;
    
    const result = rgb.match(/\d+/g);
    if (!result || result.length < 3) return null;
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  if (!selectedElement) {
    return (
      <div className="h-full bg-card border-l border-border p-4">
        <div className="text-center text-muted-foreground">
          <Layout size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-medium text-foreground mb-1">Design Panel</h3>
        <p className="text-xs text-muted-foreground">
          Selected: <code className="bg-muted px-1 rounded">{selectedElement.selector}</code>
        </p>
      </div>

      {/* All Controls */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Layout Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <Layout size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Layout</h4>
          </div>
          <div className="space-y-3">
            <SelectInput
              label="Display"
              property="display"
              options={[
                { value: 'block', label: 'Block' },
                { value: 'inline', label: 'Inline' },
                { value: 'inline-block', label: 'Inline Block' },
                { value: 'flex', label: 'Flex' },
                { value: 'grid', label: 'Grid' },
                { value: 'none', label: 'None' }
              ]}
            />
            <SelectInput
              label="Position"
              property="position"
              options={[
                { value: 'static', label: 'Static' },
                { value: 'relative', label: 'Relative' },
                { value: 'absolute', label: 'Absolute' },
                { value: 'fixed', label: 'Fixed' },
                { value: 'sticky', label: 'Sticky' }
              ]}
            />
            <NumberInput label="Width" property="width" />
            <NumberInput label="Height" property="height" />
          </div>
        </div>

        {/* Typography Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <Type size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Typography</h4>
          </div>
          <div className="space-y-3">
            <NumberInput label="Font Size" property="fontSize" />
            <SelectInput
              label="Font Weight"
              property="fontWeight"
              options={[
                { value: '100', label: 'Thin' },
                { value: '300', label: 'Light' },
                { value: '400', label: 'Normal' },
                { value: '500', label: 'Medium' },
                { value: '600', label: 'Semi Bold' },
                { value: '700', label: 'Bold' },
                { value: '900', label: 'Black' }
              ]}
            />
            <SelectInput
              label="Text Align"
              property="textAlign"
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
                { value: 'justify', label: 'Justify' }
              ]}
            />
          </div>
        </div>

        {/* Colors Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <Palette size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Colors</h4>
          </div>
          <div className="space-y-3">
            <ColorInput label="Text Color" property="color" />
            <ColorInput label="Background" property="backgroundColor" />
          </div>
        </div>

        {/* Spacing Section */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <Square size={16} className="text-primary" />
            <h4 className="font-medium text-foreground">Spacing</h4>
          </div>
          <div className="space-y-3">
            <NumberInput label="Padding" property="padding" />
            <NumberInput label="Margin" property="margin" />
            <NumberInput label="Border Radius" property="borderRadius" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders when file content changes
export const DesignPanel = memo(DesignPanelComponent, (prevProps, nextProps) => {
  // Only re-render if the selectedElement selector changes, not the element reference
  return prevProps.selectedElement?.selector === nextProps.selectedElement?.selector;
});