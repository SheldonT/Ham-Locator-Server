/** @format */
export interface User {
  userId: number; //primary key;
  call: string;
  email: string;
  country: string;
  gridloc: string;
  privilege: string;
  units: string;
  password: string;
}

export const UserSQL = `
userId INTEGER AUTO_INCREMENT PRIMARY KEY,
callsign VARCHAR(255),
email VARCHAR(255),
country VARCHAR(255),
gridloc VARCHAR(255),
privilege VARCHAR(255),
units VARCHAR(255),
passwd VARCHAR(255)`;

export const userColumnNames: string[] = [
  "callsign",
  "email",
  "country",
  "gridloc",
  "privilege",
  "units",
  "passwd",
];
