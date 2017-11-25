import { observable, action, runInAction } from 'mobx';
import { Alert } from 'react-native';
var twilio = require('twilio');

export default class TwilioApi {
  @observable query = '';
  @observable array = [];

  @action twilioInit = (name, room) =>{
    let AccessToken = twilio.jwt.AccessToken;
    let VideoGrant = AccessToken.VideoGrant;

    // Substitute your Twilio AccountSid and ApiKey details
    let ACCOUNT_SID = 'AC15d1fdc993b052e52981d08bd655be08';
    let API_KEY_SID = 'SK99dfa2b9ded9970638a0bfef0653e295';
    let API_KEY_SECRET = 'luDhftrHovyN32d1cfsH5ryRT34rQkms';

    // Create an Access Token
    let accessToken = new AccessToken(
      ACCOUNT_SID,
      API_KEY_SID,
      API_KEY_SECRET
    );

    // Set the Identity of this token
    accessToken.identity = name;

    // Grant access to Video
    let grant = new VideoGrant();
    grant.room = room;
    accessToken.addGrant(grant);

    // Serialize the token as a JWT
    let jwt = accessToken.toJwt();
    return jwt;
    //console.log(jwt);
  }
}
