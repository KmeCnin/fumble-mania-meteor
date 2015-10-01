/*
Default configurations.
layouts: DashboardLayout.
 */
Router.configure({
    layoutTemplate: 'DashboardLayout'
});

/*
SignIn page.
layouts: SinglePageLayout.
templates: SignIn.
 */
Router.route('/sign-in', function() {
    this.layout('SinglePageLayout');
    this.render('SignIn');
}, {name: 'signIn'});

/*
Home page.
layouts: ScrollPageLayout, SinglePageLayout.
templates: PublicHome, PrivateHome.
 */
Router.route('/', function() {
    if (! Meteor.userId()) {
        // If user is not already authenticated.
        this.layout('ScrollPageLayout');
        this.render('PublicHome');
        this.render('Header', {to: 'header'});
    }
    else {
        // If user is authenticated.
        this.layout('SinglePageLayout');
        this.render('PrivateHome');
    }
});

/*
Dashboard displaying one campaign.
layouts: DashboardLayout.
templates: PlayersRoom.
 */
Router.route('/dashboard/:campaign_id', function () {
    if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
    }

    this.render('PlayersRoom', {
        to: 'aside',
        data: function() {
            return CampaignsCollection.findOne({
                _id: parseInt(this.params.campaign_id)
            });
        }
    });
});