import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[ key ] || null;
    },
    setItem: function (key, value) {
      store[ key ] = value.toString();
    },
    removeItem: function(key){
      delete store[key]
    },
    clear: function () {
      store = {};
    }
  };

})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

beforeEach(() => {
  localStorageMock.clear()
});

global.Promise = require.requireActual('promise');

configure({ adapter: new Adapter() });
