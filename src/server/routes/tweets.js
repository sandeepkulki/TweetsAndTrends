const Twitter = require('twitter');
const https = require('https');

module.exports = (app, io) => {
    let twitter = new Twitter({
        consumer_key: 'qlonMVffsfsdfjLcjP2KwN0cV401neu8',
        consumer_secret: 'YGgRUksdfsdfsdfsf89w1xYEH8qME9Xsdfnes0iZY84mgOOB7L0R6yfcIl07VsfdsdfBOA',
        access_token_key: '1337076sdfsdf916847661062-29fsdfsdfsdfjLsdfsdfWs4ZhsBFJWyuWEtRZpfzDeu5sdfsfP6',
        access_token_secret: '3h2MQ1Ysdfsdfsfssf28IuXdLq4X4CgeQERLilDzDmDPVsdfsdCUWBftS7dfsdfsz4s'
    });

    let socketConnection;
    let twitterStream;

    app.locals.searchTerm = 'Javascript'; //Default search term for twitter stream.
    app.locals.showRetweets = true; //Default
    app.locals.id = '19537110';

    /**
     * Resumes twitter stream.
     */
    const stream = () => {
        console.log('Resuming for ' + app.locals.searchTerm);
        twitter.stream('statuses/filter', { track: app.locals.searchTerm }, (stream) => {
            stream.on('data', (tweet) => {
                console.log(tweet);
                sendMessage(tweet);
            });

            stream.on('error', (error) => {
                console.log(error);
            });

            twitterStream = stream;
        });
    }
    /* Failed attempts to call place json Many other ways used to call this one I kept show the tries 
    const options = {
        hostname: 'api.twitter.com',
        path: '/1.1/trends/place.json?id=1',
        method: 'GET',
        headers: {
            'Authorization': "Bearer AAAAAAAAAAAAAAAAAAAAAKqGGAEAAAAAjF0QjBeWZBQiFVV1woQSptPNN9I%3D6KWCGUe5wVTdT5aHwrALj00V0N8alIgKMsciUAUVWZWCMh85Tm",
            'Content-Type': 'application/json',

        }
    }
    let data = "";
    const stream11 = () => {

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {

                process.stdout.write(d.Trends)
                data = d;


            })
        })

        req.on('error', error => {
            return error
            console.error(error)
        })

        req.end()
    }


     app.get('/api/trends', (req, res) => {
         https.request(options, res => {
             console.log(`statusCode: ${res.statusCode}`)
 
             res.on('data', d => {
 
                 res.send(d);
 
 
             })
         })
 
     });*/

    /**
     * Sets search term for twitter stream.
     */


    app.post('/setSearchTerm', (req, res) => {
        let term = req.body.term;
        app.locals.searchTerm = term;
        twitterStream.destroy();
        stream();
    });

    /**
     * Pauses the twitter stream.
     */
    app.post('/pause', (req, res) => {
        console.log('Pause');
        twitterStream.destroy();
    });

    /**
     * Resumes the twitter stream.
     */
    app.post('/resume', (req, res) => {
        console.log('Resume');
        stream();
    });

    //Establishes socket connection.
    io.on("connection", socket => {
        socketConnection = socket;
        //stream();

        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => console.log("Client disconnected"));
    });

    /*
      Emits the data from stream 
     */
    const sendMessage = (msg) => {
        if (msg.text.includes('RT')) {
            return;
        }
        socketConnection.emit("tweets", msg);
    }
};
