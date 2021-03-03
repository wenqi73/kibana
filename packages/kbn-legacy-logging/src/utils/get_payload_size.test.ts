/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import mockFs from 'mock-fs';
import { createReadStream } from 'fs';
import { PassThrough } from 'stream';
import { createGzip, createGunzip } from 'zlib';

import { getResponsePayloadBytes } from './get_payload_size';

describe('getPayloadSize', () => {
  describe('handles Buffers', () => {
    test('with ascii characters', () => {
      const payload = 'heya';
      const result = getResponsePayloadBytes(Buffer.from(payload));
      expect(result).toBe(4);
    });

    test('with special characters', () => {
      const payload = '¡hola!';
      const result = getResponsePayloadBytes(Buffer.from(payload));
      expect(result).toBe(7);
    });
  });

  describe('handles streams', () => {
    afterEach(() => mockFs.restore());

    test('ignores streams that are not fs or zlib streams', async () => {
      const result = getResponsePayloadBytes(new PassThrough());
      expect(result).toBe(undefined);
    });

    describe('fs streams', () => {
      test('with ascii characters', async () => {
        mockFs({ 'test.txt': 'heya' });
        const readStream = createReadStream('test.txt');

        let data = '';
        for await (const chunk of readStream) {
          data += chunk;
        }

        const result = getResponsePayloadBytes(readStream);
        expect(result).toBe(Buffer.byteLength(data));
      });

      test('with special characters', async () => {
        mockFs({ 'test.txt': '¡hola!' });
        const readStream = createReadStream('test.txt');

        let data = '';
        for await (const chunk of readStream) {
          data += chunk;
        }

        const result = getResponsePayloadBytes(readStream);
        expect(result).toBe(Buffer.byteLength(data));
      });

      describe('zlib streams', () => {
        test('with ascii characters', async () => {
          mockFs({ 'test.txt': 'heya' });
          const readStream = createReadStream('test.txt');
          const source = readStream.pipe(createGzip()).pipe(createGunzip());

          let data = '';
          for await (const chunk of source) {
            data += chunk;
          }

          const result = getResponsePayloadBytes(source);

          expect(data).toBe('heya');
          expect(result).toBe(source.bytesWritten);
        });

        test('with special characters', async () => {
          mockFs({ 'test.txt': '¡hola!' });
          const readStream = createReadStream('test.txt');
          const source = readStream.pipe(createGzip()).pipe(createGunzip());

          let data = '';
          for await (const chunk of source) {
            data += chunk;
          }

          const result = getResponsePayloadBytes(source);

          expect(data).toBe('¡hola!');
          expect(result).toBe(source.bytesWritten);
        });
      });
    });
  });

  describe('handles plain responses', () => {
    test('when source is text', () => {
      const result = getResponsePayloadBytes('heya');
      expect(result).toBe(4);
    });

    test('when source contains special characters', () => {
      const result = getResponsePayloadBytes('¡hola!');
      expect(result).toBe(7);
    });

    test('when source is object', () => {
      const payload = { message: 'heya' };
      const result = getResponsePayloadBytes(payload);
      expect(result).toBe(JSON.stringify(payload).length);
    });

    test('when source is array object', () => {
      const payload = [{ message: 'hey' }, { message: 'ya' }];
      const result = getResponsePayloadBytes(payload);
      expect(result).toBe(JSON.stringify(payload).length);
    });

    test('returns undefined when source is not plain object', () => {
      class TestClass {
        constructor() {}
      }
      const result = getResponsePayloadBytes(new TestClass());
      expect(result).toBe(undefined);
    });
  });

  describe('handles content-length header', () => {
    test('always provides content-length header if available', () => {
      const headers = { 'content-length': '123' };
      const result = getResponsePayloadBytes('heya', headers);
      expect(result).toBe(123);
    });

    test('uses first value when hapi header is an array', () => {
      const headers = { 'content-length': ['123', '456'] };
      const result = getResponsePayloadBytes(null, headers);
      expect(result).toBe(123);
    });

    test('returns undefined if length is NaN', () => {
      const headers = { 'content-length': 'oops' };
      const result = getResponsePayloadBytes(null, headers);
      expect(result).toBeUndefined();
    });
  });

  test('defaults to undefined', () => {
    const result = getResponsePayloadBytes(null);
    expect(result).toBeUndefined();
  });
});
