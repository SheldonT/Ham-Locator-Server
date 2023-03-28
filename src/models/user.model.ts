/** @format */
export interface UserData {
  userId: string; //primary key;
  call: string;
  email?: string;
  country: string;
  lat: number;
  lng: number;
  gridloc: string;
  privilege?: string;
  units: string;
  itu?: number;
  utc: number;
  password?: string;
}

export const UserSQL = `
userId VARCHAR(255) PRIMARY KEY,
callsign VARCHAR(255),
email VARCHAR(255),
country VARCHAR(255),
lat DOUBLE,
lng DOUBLE,
gridloc VARCHAR(255),
privilege VARCHAR(255),
units VARCHAR(255),
itu INTEGER,
utc DOUBLE,
passwd VARCHAR(255)`;

export const userColumnNames: string[] = [
  "userId",
  "callsign",
  "email",
  "country",
  "lat",
  "lng",
  "gridloc",
  "privilege",
  "units",
  "itu",
  "utc",
  "passwd",
];
