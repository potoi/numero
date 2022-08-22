import React from 'react'
import { useState, useEffect } from 'react'
import io from 'socket.io-client';

var socket = io('http://localhost:3002', { transports: ['websocket', 'polling', 'flashsocket'] });
export default function Corpo() {

    const [count, setCount] = useState(0);
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        socket.off('recebeu');
        socket.on('recebeu', (data) => {
            if (data.id !== socket.id) {
                setCount(count + 1);
            }
            console.log("Recebi de " + data.id);
        });




    }, [count]);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });

    }, []);

    const handleCount = () => {
        console.log(count)
        setCount(count + 1);
        setCount((oldCount) => {
            setCount(oldCount + 1);

        });
        setCount(count + 1);
        var messageObject = {
            id: socket.id,
            count: count + 1,
        };
        socket.emit('apertou', messageObject);
        console.log("Enviei de " + socket.id);
    }
    const buga = () => {
        var socket2 = io("https://potoichat.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] });

        let n = 0;
        while (n < 50) {
            var messageObject = "oi"
            socket2.emit('sendMessage', messageObject);
            n++;
        }

    }
    return (
        <div>
            <button onClick={handleCount}>teste</button>
            <button onClick={buga}>Buga tudo</button>
            <p>{`${count}`}</p>
            <p>Connected: {'' + isConnected}</p>
        </div>
    )
}
