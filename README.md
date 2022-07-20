# Connect-Web

Connect-Web is a simple library to call remote procedures from a web browser. 
Unlike REST, you get a type-safe client and never have to think about
serialization again.

The procedures are defined in a [Protocol Buffer](https://developers.google.com/protocol-buffers)
schema implemented by your backend, and Connect-Web generates the clients and
related types to access the backend. The clients support two protocols:
gRPC-web, and Connect's own protocol.

The [Connect protocol](https://connect.build/docs/protocol/) is a simple,
POST-only protocol that works over HTTP/1.1 or HTTP/2. It supports
server-streaming methods just like gRPC-Web, but is easy to debug in the
network inspector. Calling a Connect API is easy enough just with the fetch
API. Try it with our live demo:

```ts
const res = await fetch("https://demo.connect.build/buf.connect.demo.eliza.v1.ElizaService/Say", {
  method: "POST",
  headers: {"content-type": "application/json"},
  body: `{"sentence": "I feel happy."}`
});
const answer = res.json();
console.log(answer);
// {sentence: 'When you feel happy, what do you do?'}
```

Using the client generated by Connect-Web, the same call becomes quite a bit 
simpler:

```ts
const answer = await eliza.say({sentence: "I feel happy."});
console.log(answer);
// {sentence: 'When you feel happy, what do you do?'}
```


## Packages

### @bufbuild/connect-web
The library that implements the Connect and gRPC-web protocols, interceptors,
and error handling. It depends on [@bufbuild/protobuf](https://www.npmjs.com/package/@bufbuild/protobuf),
our Protocol Buffers implementation for ECMAScript.

[Source](packages/connect-web) | [npmjs.com](https://www.npmjs.com/package/@bufbuild/connect-web)


### @bufbuild/protoc-gen-connect-web

The code generator plugin that generates services from your Protocol Buffer
schema. It works in tandem with [@bufbuild/protoc-gen-es](https://www.npmjs.com/package/@bufbuild/protoc-gen-es), 
the code generator plugin for all Protocol Buffer base types.

[Source](cmd/protoc-gen-connect-web) | [npmjs.com](https://www.npmjs.com/package/@bufbuild/protoc-gen-connect-web)


## Compatibility and support

`@bufbuild/connect-web` requires the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
and the [Encoding API](https://developer.mozilla.org/en-US/docs/Web/API/Encoding_API).  
The library and the generated code are compatible with ES2017 and TypeScript 4.1.   
Connect-Web follows semantic versioning.


## Ecosystem

* [connect-go](https://github.com/bufbuild/connect-go):
  Go implementation of gRPC, gRPC-Web, and Connect
* [connect-demo](https://github.com/bufbuild/connect-demo):
  demonstration service powering demo.connect.build
* [connect-crosstest](https://github.com/bufbuild/connect-crosstest):
  gRPC-Web and Connect interoperability tests


## Status

This project is a beta: we rely on it in production, but we may make a few
changes as we gather feedback from early adopters. We're planning to tag a
stable v1 later this year.


## Legal

Offered under the [Apache 2 license](/LICENSE).
