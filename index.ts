import net from "net";

class Narrier {
    private addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/; // parse "80" and "localhost:80" or even "42mEANINg-life.com:80"
    private addr: {
        from: { host: string, port: number, },
        to: { host: string, port: number, },
    };

    private server = null as net.Server | null;

    constructor(fromString: string, toString: string) {
        const from = this.addrRegex.exec(fromString);
        const to = this.addrRegex.exec(toString);
        if (from === null || to === null) { throw new Error(`Invalid address: ${from} ${to}`); };
        this.addr = {
            from: { host: from[2], port: Number(from[3]), },
            to: { host: to[2], port: Number(to[3]), }
        };
        // console.log(this.addr);
    };

    start = () => {
        const addr = this.addr;

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
                from: ${ this.addr.from.host + ":" + this.addr.from.port }
                to: ${ this.addr.to.host + ":" + this.addr.to.port }`
            );
        });
    };

    stop = () => {
        this.server?.close();
    };
};

export default Narrier;

// const narrier = new Narrier("80", "8080");

// narrier.start();