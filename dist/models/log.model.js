"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logColumnNames = exports.RecordSQL = void 0;
exports.RecordSQL = `
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
exports.logColumnNames = [
    "recordId",
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
