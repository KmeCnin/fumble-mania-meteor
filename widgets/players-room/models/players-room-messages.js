PlayersRoomMessagesCollection = new Mongo.Collection("players-room-messages");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("players-room-messages", function () {
        return PlayersRoomMessagesCollection.find({
            owner: this.userId
        });
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("players-room-messages");
}

Meteor.startup(function() {
    return Meteor.methods({
        clearPlayersRoomMessages: function() {
            if (! Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }

            return PlayersRoomMessagesCollection.remove({});
        },
        addPlayersRoomMessage: function(data) {
            if (! Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }

            return PlayersRoomMessagesCollection.insert({
                owner: Meteor.userId(),
                username: Meteor.user().username,
                content: data.content,
                date: new Date()
            });
        }
    });
});