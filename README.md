# Chat Demo with Ably and AWS Lambdas

This demo makes use of Ably for realtime communication between devices and a server, and an AWS Lambda backend for processing chat messages. The server instance run is an Express server, which also acts as a filter for certain banned words. 

This demo makes use of the [Ably Chat WebComponent](https://github.com/ably-labs/ably-chat-component) to render the chat interface to the clients.

## Running this demo

To run this demo, you can run:

```sh
npm run start
```
