import React, { useCallback, useState } from "react";

interface SwitchProps {
  disabled?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled,
}: SwitchProps) => {
  const [localChecked, setLocalChecked] = useState(checked);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
      
      if(disabled) return;
      setLocalChecked(event.target.checked);
    },
    [onChange, disabled]
  );

  return (
    <label
      className={`transition duration-500 w-[40px] h-[22px] rounded-full block relative cursor-pointer ${
        localChecked ? "bg-primary" : "bg-gray-500"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <input
        checked={localChecked}
        onChange={handleChange}
        type="checkbox"
        className="w-0 h-0 opacity-0"
      />
      <div
        className={`transition-all duration-350 w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] ${
          localChecked ? "left-[20px]" : "left-[2px]"
        }`}
      />
    </label>
  );
};
