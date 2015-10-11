CampaignsCollection = new Mongo.Collection("campaigns");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("campaigns", function () {
        return CampaignsCollection.find({
            owner: this.userId
        });
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("campaigns");
}

Meteor.startup(function() {
    return Meteor.methods({
        addCampaign: function(data) {
            if (! Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }

            return CampaignsCollection.insert({
                owner: Meteor.userId(),
                master: data.master,
                players: data.players,
                title: data.title,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    });
});