'use client';

import { memo, useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronDown,
  Layout,
  Palette,
  Square,
  Type,
} from 'lucide-react';

interface DesignPanelProps {
  selectedElement: {
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null;
  onStyleChange: (property: string, value: string) => void;
}

type StyleMap = Record<string, string>;

const CHECKER_BG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwq1ev/s8IJQBnI1uAAwAA/yo3/06y8qYAAAAASUVORK5CYII=";

function DesignPanelComponent({ selectedElement, onStyleChange }: DesignPanelProps) {
  const [styles, setStyles] = useState<StyleMap>({});

  useEffect(() => {
    if (!selectedElement?.styles) return;

    const computedStyles = selectedElement.styles;
    const padding = getUniformSpacing(
      computedStyles.paddingTop,
      computedStyles.paddingRight,
      computedStyles.paddingBottom,
      computedStyles.paddingLeft
    );
    const margin = getUniformSpacing(
      computedStyles.marginTop,
      computedStyles.marginRight,
      computedStyles.marginBottom,
      computedStyles.marginLeft
    );
    const borderRadius =
      computedStyles.borderRadius || computedStyles.borderTopLeftRadius || '0px';

    setStyles({
      display: computedStyles.display,
      position: computedStyles.position,
      width: computedStyles.width,
      height: computedStyles.height,
      'font-size': computedStyles.fontSize,
      'font-weight': computedStyles.fontWeight,
      'text-align': computedStyles.textAlign,
      color: computedStyles.color,
      'background-color': computedStyles.backgroundColor,
      padding,
      margin,
      'border-radius': borderRadius,
    });
  }, [selectedElement]);

  const handleStyleChange = (property: string, value: string) => {
    setStyles((prev) => ({ ...prev, [property]: value }));
    onStyleChange(property, value);
  };

  const safeStyleValue = (property: string) => styles[property] ?? '';

  const normalizeColorValue = (value: string) => {
    if (!value) return '';
    if (value === 'transparent' || value === 'rgba(0, 0, 0, 0)') return 'transparent';
    return rgbToHex(value) || value;
  };

  const displayValue = safeStyleValue('display') || 'block';
  const positionValue = safeStyleValue('position') || 'static';
  const rawFontWeight = safeStyleValue('font-weight') || '400';
  const fontWeightValue =
    rawFontWeight === 'normal' ? '400' : rawFontWeight === 'bold' ? '700' : rawFontWeight;
  const textAlignValue = safeStyleValue('text-align') || 'left';

  const fontWeightOptions = useMemo(
    () => [
      { value: '100', label: 'Thin (100)' },
      { value: '300', label: 'Light (300)' },
      { value: '400', label: 'Regular (400)' },
      { value: '500', label: 'Medium (500)' },
      { value: '600', label: 'Semibold (600)' },
      { value: '700', label: 'Bold (700)' },
      { value: '900', label: 'Black (900)' },
    ],
    []
  );

  if (!selectedElement) {
    return (
      <aside className="h-full w-full bg-[#0b0b0b] border-l border-white/5 text-neutral-200 flex flex-col">
        <div className="h-12 px-4 border-b border-white/5 flex items-center justify-between shrink-0">
          <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            Design
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-neutral-500 text-sm">
          Select an element to edit its styles
        </div>
        <div className="h-12 border-t border-white/5 flex items-center justify-center text-xs text-neutral-500">
          Design Mode • Auto-save enabled
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-full w-full bg-[#0b0b0b] border-l border-white/5 text-neutral-200 flex flex-col">
      <div className="h-12 px-4 border-b border-white/5 flex items-center justify-between shrink-0">
        <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          Design
        </span>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] text-neutral-500">Selected:</span>
          <span className="bg-white/5 text-neutral-200 border border-white/10 rounded px-1.5 py-0.5 text-[10px] font-mono truncate max-w-[140px]">
            {selectedElement.selector}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Section title="Layout" icon={Layout}>
          <FieldRow label="Display">
            <SelectField
              value={displayValue}
              onChange={(value) => handleStyleChange('display', value)}
              options={[
                { value: 'block', label: 'Block' },
                { value: 'inline', label: 'Inline' },
                { value: 'inline-block', label: 'Inline Block' },
                { value: 'flex', label: 'Flex' },
                { value: 'grid', label: 'Grid' },
                { value: 'none', label: 'None' },
              ]}
            />
          </FieldRow>
          <FieldRow label="Position">
            <SelectField
              value={positionValue}
              onChange={(value) => handleStyleChange('position', value)}
              options={[
                { value: 'static', label: 'Static' },
                { value: 'relative', label: 'Relative' },
                { value: 'absolute', label: 'Absolute' },
                { value: 'fixed', label: 'Fixed' },
                { value: 'sticky', label: 'Sticky' },
              ]}
            />
          </FieldRow>
          <FieldRow label="Width">
            <ValueField
              value={safeStyleValue('width')}
              onChange={(value) => handleStyleChange('width', value)}
              suffix="px"
            />
          </FieldRow>
          <FieldRow label="Height">
            <ValueField
              value={safeStyleValue('height')}
              onChange={(value) => handleStyleChange('height', value)}
              suffix="px"
            />
          </FieldRow>
        </Section>

        <Section title="Typography" icon={Type}>
          <FieldRow label="Font Size">
            <ValueField
              value={safeStyleValue('font-size')}
              onChange={(value) => handleStyleChange('font-size', value)}
              suffix="px"
            />
          </FieldRow>
          <FieldRow label="Weight">
            <SelectField
              value={fontWeightValue}
              onChange={(value) => handleStyleChange('font-weight', value)}
              options={fontWeightOptions}
            />
          </FieldRow>
          <FieldRow label="Align">
            <div className="flex items-center gap-1 rounded-md border border-white/10 bg-[#111] p-1">
              {[
                { value: 'left', icon: AlignLeft, label: 'Left' },
                { value: 'center', icon: AlignCenter, label: 'Center' },
                { value: 'right', icon: AlignRight, label: 'Right' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleStyleChange('text-align', value)}
                  title={label}
                  className={`flex-1 h-8 rounded-md flex items-center justify-center transition-colors ${
                    textAlignValue === value
                      ? 'bg-white/10 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </FieldRow>
        </Section>

        <Section title="Colors" icon={Palette}>
          <ColorRow
            label="Text Color"
            value={normalizeColorValue(safeStyleValue('color')) || '#ffffff'}
            onChange={(value) => handleStyleChange('color', value)}
          />
          <ColorRow
            label="Background"
            value={normalizeColorValue(safeStyleValue('background-color')) || 'transparent'}
            onChange={(value) => handleStyleChange('background-color', value)}
            showChecker
          />
        </Section>

        <Section title="Spacing" icon={Square} last>
          <FieldRow label="Padding">
            <ValueField
              value={safeStyleValue('padding')}
              onChange={(value) => handleStyleChange('padding', value)}
              suffix="px"
            />
          </FieldRow>
          <FieldRow label="Margin">
            <ValueField
              value={safeStyleValue('margin')}
              onChange={(value) => handleStyleChange('margin', value)}
              suffix="px"
            />
          </FieldRow>
          <FieldRow label="Radius">
            <ValueField
              value={safeStyleValue('border-radius')}
              onChange={(value) => handleStyleChange('border-radius', value)}
              suffix="px"
            />
          </FieldRow>
        </Section>
      </div>

      <div className="h-12 border-t border-white/5 flex items-center justify-center text-xs text-neutral-500">
        Design Mode • Auto-save enabled
      </div>
    </aside>
  );
}

function Section({
  title,
  icon: Icon,
  children,
  last,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`px-4 py-5 ${last ? '' : 'border-b border-white/5'}`}>
      <div className="flex items-center gap-2 text-[15px] font-medium text-neutral-300 mb-4">
        <Icon className="h-4 w-4" />
        <span>{title}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function FieldRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 shrink-0 text-sm text-neutral-400">{label}</span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function ValueField({
  value,
  onChange,
  suffix,
}: {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  const formatValue = (raw: string) => {
    if (!suffix) return raw;
    const trimmed = raw.trim();
    if (trimmed.toLowerCase().endsWith(suffix)) {
      return trimmed.slice(0, -suffix.length);
    }
    return trimmed;
  };

  const [localValue, setLocalValue] = useState(formatValue(value));

  useEffect(() => {
    setLocalValue(formatValue(value));
  }, [value]);

  const commitValue = () => {
    const cleaned = localValue.trim();
    if (!cleaned) return;
    const hasUnit = /[a-z%]+$/i.test(cleaned);
    const nextValue = suffix && !hasUnit ? `${cleaned}${suffix}` : cleaned;
    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  return (
    <div className="flex items-center rounded-md border border-white/10 bg-[#111] overflow-hidden">
      <input
        type="text"
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        onBlur={commitValue}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            commitValue();
            event.currentTarget.blur();
          }
        }}
        className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
      />
      {suffix ? (
        <span className="px-2 text-xs text-neutral-500 border-l border-white/10 bg-[#0f0f0f]">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-md border border-white/10 bg-[#111] px-3 py-2 text-sm text-neutral-100 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
    </div>
  );
}

function ColorRow({
  label,
  value,
  onChange,
  showChecker,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showChecker?: boolean;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const commitValue = () => {
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const swatchFill = value === 'transparent' ? 'transparent' : value;
  const pickerValue = rgbToHex(value) || '#000000';

  return (
    <div className="space-y-2">
      <span className="text-sm text-neutral-400">{label}</span>
      <div className="grid grid-cols-[40px_1fr] items-center gap-3">
        <label className="relative h-10 w-10 rounded-md border border-white/10 overflow-hidden cursor-pointer">
          {showChecker ? (
            <span
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${CHECKER_BG}')`,
                backgroundSize: '8px 8px',
              }}
            />
          ) : null}
          <span className="absolute inset-0" style={{ backgroundColor: swatchFill }} />
          <input
            type="color"
            value={pickerValue}
            onChange={(event) => onChange(event.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
        <div className="flex items-center rounded-md border border-white/10 bg-[#111] overflow-hidden">
          <input
            type="text"
            value={localValue}
            onChange={(event) => setLocalValue(event.target.value)}
            onBlur={commitValue}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                commitValue();
                event.currentTarget.blur();
              }
            }}
            className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

function getUniformSpacing(
  top: string,
  right: string,
  bottom: string,
  left: string
): string {
  if (top && top === right && top === bottom && top === left) return top;
  return top || right || bottom || left || '0px';
}

function rgbToHex(rgb: string): string | null {
  if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return null;

  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return null;

  const r = parseInt(result[0], 10);
  const g = parseInt(result[1], 10);
  const b = parseInt(result[2], 10);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const DesignPanel = memo(DesignPanelComponent, (prevProps, nextProps) => {
  return prevProps.selectedElement?.selector === nextProps.selectedElement?.selector;
});
