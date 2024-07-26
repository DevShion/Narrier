![head.png](./assets/head.png)

# Narrier

NodeJS Port Forward module

## Install

```sh
npm i @devshion/narrier
```

## Usage

```ts
import { Narrier } from "@devshion/narrier";

const narrier = new Narrier({
    from: "3003", // also support "IP_OR_DOMAIN:PORT"
    to: "80", // same
});

// start
narrier.start().then(() => {
    // change process id here if you use "sudo"
});

// stop
narier.srop().then(() => {
    // write your code here
});
```

## Use Well known port?

### CentOS

```sh
$ sudo yum install libcap
Last metadata expiration check: 1 day, 18:51:33 ago on Thu Jul 25 01:01:27 2024.
Package libcap-2.48-2.amzn2023.0.3.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!

$ sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```

### Ubuntu

```sh
$ sudo apt-get install libcap2-bin
Last metadata expiration check: 1 day, 18:51:33 ago on Thu Jul 25 01:01:27 2024.
Package libcap-2.48-2.amzn2023.0.3.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!

$ sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```