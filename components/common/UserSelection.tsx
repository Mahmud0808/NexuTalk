"use client";

import ReactSelect from "react-select";

interface UserSelectionProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const UserSelection = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: UserSelectionProps) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-text">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti={true}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            option: (provided, state) => ({
              ...provided,
              padding: 8,
              fontSize: 14,
            }),
          }}
          classNames={{
            control: () => "text-sm font-medium leading-6 text-text",
          }}
          className="react-select-container"
          classNamePrefix="react-select"
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              text: "text-text text-sm",
              primary25: "var(--color-accent)",
              neutral0: "var(--color-bg-input)",
            },
          })}
        />
      </div>
    </div>
  );
};

export default UserSelection;
