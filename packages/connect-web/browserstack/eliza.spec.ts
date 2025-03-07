// Copyright 2021-2025 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "../src/connect-transport.js";
import {
  ElizaService,
  IntroduceRequestSchema,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { create } from "@bufbuild/protobuf";

const timeoutMs = 15000;

describe("eliza", () => {
  const transport = createConnectTransport({
    baseUrl: "https://demo.connectrpc.com",
  });
  it(
    "say()",
    async () => {
      const client = createClient(ElizaService, transport);
      const res = await client.say({ sentence: "I feel happy." });
      expect(typeof res.sentence).toBe("string");
    },
    timeoutMs,
  );
  it(
    "introduce()",
    async () => {
      const client = createClient(ElizaService, transport);
      const request = create(IntroduceRequestSchema, {
        name: "Browser",
      });
      let receivedMessages = 0;
      for await (const response of client.introduce(request)) {
        expect(response.sentence.length > 0).toBe(true);
        receivedMessages++;
      }
      expect(receivedMessages > 3).toBe(true);
    },
    timeoutMs,
  );
});
