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
  lag: number;
  lng: number;
  country?: string;
  details?: string;
  date: string;
  time: string;
  utc: number;
}
