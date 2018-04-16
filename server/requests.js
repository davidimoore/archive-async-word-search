const requestPromise = require('request-promise');

module.exports = {
  webstersSearch: function(word) {
    const options = {
      uri: `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${word}`,
      headers: {
        app_id: '70b66f4f',
        app_key: '777b274256144e2d774689c3b14d719f'
      },
      json: true
    };

    return requestPromise(options)
      .then(response => response)
      .catch(error => console.log(error))
  }
};

