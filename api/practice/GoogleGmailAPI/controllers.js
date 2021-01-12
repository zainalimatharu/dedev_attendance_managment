// importing required modules & packages
const { google } = require('googleapis');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

const key = require('../middlewares/sacredentials.json');

// specifying Gmail API scopes scopes
const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

// importing google auth function and initialize it
// const auth = require('../middlewares/googleAuth')(scopes);

async function authClient() {
  try {
    const jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://mail.google.com/'],
      '<mail to suplant>'
      //   key.private_key_id
    );

    await jwtClient.authorize();

    return jwtClient;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

// initializing & authorizing calendar
// const gmail = google.gmail({ version: 'v1', auth });

const gmail = google.gmail('v1');

async function listMessages(req, res, next) {
  try {
    const messages = await gmail.users.messages.list({
      auth: authClient(),
      userId: 'me',
      maxResults: 10,
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

module.exports = { listMessages };
