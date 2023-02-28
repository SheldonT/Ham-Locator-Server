/** @format */

export interface Record {
  recordId: number;
  userId: number;
  contactCall: string;
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
  contactDate: string;
  contactTime: string;
  utc: number;
}

export const RecordSQL = `
  recordId INTEGER AUTO_INCREMENT PRIMARY KEY,
  userId INTEGER,
  contactCall VARCHAR(255),
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
  contactDate DATE,
  contactTime TIME,
  utc INTEGER
  `;

export const logColumnNames: string[] = [
  "userId",
  "contactCall",
  "freq",
  "mode",
  "sigRepSent",
  "sigRepRecv",
  "name",
  "grid",
  "serialSent",
  "serialRecv",
  "comment",
  "lat",
  "lng",
  "country",
  "details",
  "contactDate",
  "contactTime",
  "utc",
];
