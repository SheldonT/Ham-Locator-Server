/** @format */

export interface Record {
  recordId: number;
  userId: number;
  username: string;
  userCall: string;
  freq: number;
  mode: string;
  sigRepSent: number;
  sigRepRecv: number;
  name?: string;
  grid?: string;
  serialSent?: number;
  serialRecv?: number;
  comment?: string;
  lat: number;
  lng: number;
  country?: string;
  details?: string;
  date: string;
  time: string;
  utc: number;
}

export const RecordSQL = `
  recordId INTEGER PRIMARY KEY,
  userId INTEGER,
  username TEXT NOT NULL,
  userCall VARCHAR(255),
  freq DOUBLE,
  mode VARCHAR(255),
  sigRepSent INTEGER,
  sigRepRecv INTEGER,
  name VARCHAR(255),
  grid VARCHAR(255),
  serialSent INTEGER,
  serialRecv INTEGER,
  comment VARCHAR(255),
  lat DOUBLE,
  lng DOUBLE,
  country VARCHAR(255),
  details VARCHAR(255),
  date DATE,
  time TIME,
  utc INTEGER
  `;
