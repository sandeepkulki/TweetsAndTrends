import React, { useState, useEffect } from 'react';
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

function HomeComponent() {

        return (
                <div className="row">

                        <h1 className="margin10">
                                Home Component
                        </h1>

                        <p className="margin10 displayP">
                                Please navigate to Tweets and Trends
                        </p>

                </div>
        );
}
export default HomeComponent