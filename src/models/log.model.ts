/** @format */

export interface Record {
  record_id: string;
  userid: string;
  contact_call: string;
  freq: number;
  mode: string;
  sig_rep_sent: number;
  sig_rep_recv: number;
  name?: string;
  grid?: string;
  serial_sent?: number;
  serial_recv?: number;
  comment?: string;
  lat: number;
  lng: number;
  country?: string;
  details?: string;
  contact_date: string;
  contact_time: string;
  utc: number;
}

/////////PostgreSQL Migration
export const RecordPSQL = `
  record_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  contact_call VARCHAR(255),
  freq DOUBLE PRECISION,
  mode VARCHAR(255),
  sig_rep_sent INTEGER,
  sig_rep_recv INTEGER,
  name VARCHAR(255),
  grid VARCHAR(255),
  serial_sent INTEGER,
  serial_recv INTEGER,
  comment VARCHAR(255),
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  country VARCHAR(255),
  details VARCHAR(255),
  contact_date DATE,
  contact_time TIME,
  utc INTEGER
  `;

/////////////

export const RecordSQL = `
  recordId VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255),
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
  "record_id",
  "user_id",
  "contact_call",
  "freq",
  "mode",
  "sig_rep_sent",
  "sig_rep_recv",
  "name",
  "grid",
  "serial_sent",
  "serial_recv",
  "comment",
  "lat",
  "lng",
  "country",
  "details",
  "contact_date",
  "contact_time",
  "utc",
];
