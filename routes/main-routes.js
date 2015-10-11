/*
SignIn page.
layouts: PopInLayout.
templates: SignIn.
 */
Router.route('/sign-in', function() {
    this.layout('PopInLayout');
    this.render('SignIn');
}, {name: 'sign-in'});

/*
SignOut page.
redirect: Home.
 */
Router.route('/sign-out', function() {
    this.redirect('/');
}, {
    name: 'sign-out',
    onBeforeAction: function() {
        Meteor.logout(function() {});
        this.next();
}});

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
    }
    else {
        // If user is authenticated.
        this.layout('SinglePageLayout');
        this.render('PrivateHome');
        this.render('Header', {to: 'header'});
    }
}, {name: 'home'});

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
    this.render('Header', {to: 'header'});
}, {name: 'campaign'});