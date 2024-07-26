"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Narrier = void 0;
const net = __importStar(require("net"));
class Narrier {
    addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/; // parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
    addr;
    server = null;
    constructor(options) {
        const from = this.addrRegex.exec(options.from);
        const to = this.addrRegex.exec(options.to);
        if (from === null || to === null) {
            throw new Error(`Invalid address: ${from} ${to}`);
        }
        ;
        this.addr = {
            from: { host: from[2], port: Number(from[3]), },
            to: { host: to[2], port: Number(to[3]), }
        };
        // console.log(this.addr);
    }
    ;
    start = async () => {
        const addr = this.addr;
        await new Promise((resolve) => {
            this.server = net.createServer((from) => {
                const to = net.createConnection({
                    host: addr.to.host,
                    port: addr.to.port,
                });
                from.pipe(to);
                to.pipe(from);
            }).listen(addr.from.port, addr.from.host, () => {
                console.log(`
                Port forwarding
                from: ${(this.addr.from.host ? this.addr.from.host : "127.0.0.1") + ":" + this.addr.from.port}
                to: ${(this.addr.to.host ? this.addr.to.host : "127.0.0.1") + ":" + this.addr.to.port}`);
                resolve();
            });
        });
    };
    stop = async () => {
        await new Promise((resolve) => {
            this.server?.close();
            resolve();
        });
    };
}
exports.Narrier = Narrier;
;
