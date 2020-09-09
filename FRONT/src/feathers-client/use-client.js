import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import restClient from '@feathersjs/rest-client'
import feathersVuex from 'feathers-vuex'
import axios from 'axios'


// const socket = io('http://localhost:8080');
const client = feathers()
.configure(restClient('http://localhost:8080').axios(axios));

client.configure(socketio(socket));

const taskService = client.service('tasks');

taskService.on('created', task => console.log('Created a task', task));

// Utilisation du service de tâches depuis le serveur
taskService.create({
  name: 'Nouvelle tâche',
  completed: false,
});

export default client;