import { Switch } from "@shared/components/Switch";
import React from "react";

export enum ListItemType {
  Switch,
  Link
}

interface ListItemProps {
  as?: ListItemType;
  linkText?: string;
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  subText?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const ListItem = ({
  as,
  linkText,
  onClick,
  onChange,
  title,
  subText,
  checked = false,
  disabled = false,
}: ListItemProps) => {
  return (
    <section className="flex justify-between items-center border-b mb-3 pb-3">
      <div>
        <h1 className="text-,d font-medium text-primary-text">{title}</h1>
        <p className="text-xs text-gray-500 text-secondary-text">{subText}</p>
      </div>
      <div>
        {as === ListItemType.Link ? (
          <a
            href="#link"
            onClick={onClick}
            className="text-md font-medium underline text-primary-text"
          >
            {linkText}
          </a>
        ) : null}
        {as === ListItemType.Switch ? (
          <Switch disabled={disabled} checked={checked} onChange={onChange} />
        ) : null}
      </div>
    </section>
  );
};
