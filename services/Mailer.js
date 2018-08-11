const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {

    constructor(email, content){
        super();
        
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email= new helper.Email('no-reply@emaily.com');
        this.subject = "Cambur Pintón - Confirmació de pedido";
        this.body = new helper.Content('text/html', content);
        this.recipients = new helper.Email(email);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){ 
        const personalize = new helper.Personalization();
        
        personalize.addTo(this.recipients);
        personalize.addTo(new helper.Email('mikjailsalazar@gmail.com'));

        this.addPersonalization(personalize);
    }

    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;