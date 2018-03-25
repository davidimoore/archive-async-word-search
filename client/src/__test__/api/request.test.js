import * as request from 'api/request';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('request', () => {
  describe('getRequest', () => {
    it('gets a response', async () => {
      const headers = { api_key: 'randomKey123' };
      const params = { word: 'hat' };
      const url = "http://api.website.com";
      const response = {
        definition: 'something you wear on your head'
      };

      mock.onGet(url, { params }).reply(200, response);

      const result = await request.getRequest({ params, url, headers});

      expect(result).toMatchObject(response)
    })
  })
});
