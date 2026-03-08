export interface Country {
  name: CountryName;
  capital: string[];
  region: string;
  population: number;
  flags:CountryFlag ;
}

export interface CountryName {
  toLowerCase(): unknown;
  common: string;
  official: string;
}

export interface CountryFlag {
  png: string;
  svg: string;
}
