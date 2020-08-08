import config from './firebaseConfig.json';
import app, { firestore, database } from 'firebase/app';
import React from 'react';
import firebase from 'firebase';
require('firebase/auth');
require('firebase/firestore');
require('firebase/database');
require('firebase/storage');

export class Firebase {
	auth: app.auth.Auth;
	db: app.firestore.Firestore;
	rtdb: app.database.Database;
	storage: app.storage.Storage;

	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.firestore();
		this.rtdb = app.database();
		this.storage = app.storage();
		this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	}
	// Firebase functions maybe written here and accessed from within the app.
}

export const FirebaseContext = React.createContext<Firebase | null>(null);
