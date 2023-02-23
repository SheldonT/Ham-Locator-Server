/** @format */
export interface User {
  id: string; //primary key;
  username: string;
  email: string;
  country: string;
  gridloc: string;
  privilege: string;
  units: string;
  password: string;
}

export const UserSQL = `
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  email VARCHAR(255),
  country VARCHAR(255),
  grid VARCHAR(255),
  privilege VARCHAR(255),
  units VARCHAR(255),
  passwd VARCHAR(255),
  callsign VARCHAR(255)
  `;
