"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Narrier = void 0;
const net_1 = __importDefault(require("net"));
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
    start = () => {
        const addr = this.addr;
        this.server = net_1.default.createServer((from) => {
            const to = net_1.default.createConnection({
                host: addr.to.host,
                port: addr.to.port,
            });
            from.pipe(to);
            to.pipe(from);
        }).listen(addr.from.port, addr.from.host, () => {
            console.log(`
                Port forwarding
                from: ${this.addr.from.host + ":" + this.addr.from.port}
                to: ${this.addr.to.host + ":" + this.addr.to.port}`);
        });
    };
    stop = () => {
        this.server?.close();
    };
}
exports.Narrier = Narrier;
;
