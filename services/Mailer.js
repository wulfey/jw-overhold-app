const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // when you call new, it calls constructor()
  // es6 syntax, the {} is a way of saying object. expect an
  // {} object with variables with these keys subject: and recipients: in there
  // then the data behind those keys is passed
  constructor({ subject, recipients }, content) {
    // what ... this does something awesome ...
    super();

    // this is how you get the API thing out
    this.sgApi = sendgrid(keys.SENDGRID_API_KEY);

    //defining a property on NEW
    // helper is doing some serious work here
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();

    // turns formatted list of helper objects and turns it into emails
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      //returns an array of helper email objects
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    // addPersonalization is a mail base thing, personalize is an object
    // that object has all our recipients added to it
    // this logic is actually brutal, no getting around it
    // mailchimp may be easier?  god damn

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    // API is a function by sendGrid
    // this is the ACTUAL APIE REQUEST
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
