import React from 'react';
import socketIOClient from "socket.io-client";
import ReactWordcloud from "react-wordcloud";
const callbacks = {
        onWordClick: console.log,
        onWordMouseOver: console.log,
        getWordTooltip: word => `${word.value}`,
}
const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
};
const size = [600, 400];
const words = [];
class Trends extends React.Component {
        constructor(props) {
                super(props);
                this.state = { items: [] };

        }


        componentDidMount() {
                const socket = socketIOClient('http://localhost:3000/');

                socket.on('connect', () => {
                        console.log("Socket Connected");
                        socket.on("tweets", data => {
                                console.info(data);
                                let newList = [data].concat(this.state.items);
                                this.setState({ items: newList });
                        });

                        /*  Due to Access token and timelimit didn't created this call in Node but didn't add to socket so using same Stream to get trends too
                        
                        let listOfData = fetch("/api/trends",
                                 {
                                         method: "GET",
                                         headers: {
                                                 'Content-Type': 'application/json'
                                         },
 
                                 })*/


                });
                socket.on('disconnect', () => {
                        socket.off("tweets")
                        socket.removeAllListeners("tweets");
                        console.log("Socket Disconnected");
                });
        }


        render() {

                let items = this.state.items;


                console.log('------Words -------');
                //console.log(items);


                items.map((x, i) => {
                        let text = x.text.slice(0, 30);
                        let objw = { text: text, value: x.id }

                        words.push(objw);


                });

                // console.log(words);

                return (
                        <div className="row">

                                <div className="col s10 m4 l4 margin10">
                                        <ReactWordcloud
                                                callbacks={callbacks}
                                                options={options}
                                                size={size}
                                                words={words}
                                        />
                                </div>

                        </div>
                );
        }
}


export default Trends;