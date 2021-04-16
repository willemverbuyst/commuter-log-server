export const firebaseConfig = {
  // @ts-ignore
  apiKey: __myapp.env.API_KEY,
  // @ts-ignore
  authDomain: `${__myapp.env.PROJECT_ID}.firebaseapp.com`,
  // @ts-ignore
  databaseURL: `https://${__myapp.env.PROJECT_ID}.firebaseio.com`,
  // @ts-ignore
  projectId: __myapp.env.PROJECT_ID,
  // @ts-ignore
  storageBucket: `${__myapp.env.PROJECT_ID}.appspot.com`,
  // @ts-ignore
  messagingSenderId: __myapp.env.SENDER_ID,
  // @ts-ignore
  appId: __myapp.env.APP_ID,
};
