import SvgSelector from 'assets/icons/SvgSelector';
import React from 'react';
import { Select, SelectOption } from 'ui';

interface props {
  language: string;
  handleLanguageChange: any;
}

export function LanguageSwitcher({ handleLanguageChange, language }: props) {
  return (
    <Select value={language} onChange={handleLanguageChange} showSearch={false}>
      <SelectOption value={'1'}>
        <div className="select-item-language">
          <SvgSelector id="english" />
          EN
        </div>
      </SelectOption>
      <SelectOption value={'0'}>
        <div className="select-item-language">
          <SvgSelector id="korea" />
          KO
        </div>
      </SelectOption>
      <SelectOption value={'2'}>
        <div className="select-item-language">
          <SvgSelector id="uzbekistan" />
          UZ
        </div>
      </SelectOption>
      <SelectOption value={'3'}>
        <div className="select-item-language">
          <SvgSelector id="russia" />
          RU
        </div>
      </SelectOption>
    </Select>
  );
}
