//'post   /bling': 'BlingController.reqPost',
module.exports = {
    friendlyName: 'req Post',
    description: 'Toda requisição feita através do método post via HTTP será tratada e estabilizada em uma nova sala',
    disableDevelopmentHeaders: true,

    inputs: {
        postData: {
            type: 'ref',
            example: '{"exaMple":"Ab", [true, null, 123]}',
            description: 'Json contendo o header[acess_token, server], body[url,formData] ',
            required: true
        }
    },

    exits: {
        error: {
            description: 'Um erro inexplicável ocorreu, desculpa !'
        },
        wrongOrNoKey: {
            description: 'Você não tem autorização para acessar o Bling'
        },
        success: {
            description: 'Criando nova sala',
            sync: true,
            example: true
        }
    },

    fn: function(inputs, exits) {

        var URL = require('url');
        var QS = require('querystring');
        var _ = require('lodash');
        var Http = require('machinepack-http');

        var url = inputs.urlBase + inputs.uri;
        var header = inputs.header;
        var body = inputs.body;

        var result = await sails.helpers.sendPost(url, header, body);

        if (result) {

        }
        Http.sendHttpRequest({
            baseUrl: 'http://api.klout.com/v2/identity.json/twitter?screenName=' + inputs.twitterScreenName + '&key=' + inputs.apiKey,
            url: '',
            method: 'post',
        }).exec({
            // OK.
            success: function(result) {

                try {
                    var responseBody = JSON.parse(result.body);
                } catch (e) {
                    return exits.error('An error occurred while parsing the body.');
                }

                return exits.success(responseBody.id);

            },
            // Non-2xx status code returned from server
            notOk: function(result) {

                try {
                    if (result.status === 403) {
                        return exits.wrongOrNoKey("Invalid or unprovided API key. All calls must have a key.");
                    }
                } catch (e) {
                    return exits.error(e);
                }

            },
            // An unexpected error occurred.
            error: function(err) {

                exits.error(err);
            },
        });
    }
};
