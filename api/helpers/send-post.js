module.exports = {


    friendlyName: 'Send post',


    description: 'Abrir o canal',


    inputs: {
        url: {
            type: 'string',
            example: 'http://api.lojahub/marketplace/params',
            description: 'Url especificando a ação a ser executada na API',
            required: true
        },
        headers: {
            type: 'ref',
            example: '{"exaMple":"Ab", [true, null, 123]}',
            description: 'Json contendo o header[acess_token, server]',
            required: true
        },
        body: {
            type: 'ref',
            example: '{"exaMple":"Ab", [true, null, 123]}',
            description: 'Json contendo o body[url,formData]'
        }
    },


    exits: {

        success: {
            description: 'A sala foi criada com sucesso',
        },

    },


    fn: async function(inputs) {
        // TODO
    }


};
