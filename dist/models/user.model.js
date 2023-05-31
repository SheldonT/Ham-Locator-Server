"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userColumnNames = exports.UserSQL = void 0;
exports.UserSQL = `
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
exports.userColumnNames = [
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
