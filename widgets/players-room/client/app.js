Template.PlayersRoom.helpers({
    playersRoomMessages: function () {
        //Meteor.call("clearPlayersRoomMessages");
        return PlayersRoomMessagesCollection.find({}, {sort: {date: 1}});
    },
    isOwner: function () {
        return this.owner === Meteor.userId();
    }
});

Template.PlayersRoom.events({
    /*
     Post a new message in players room.
     */
    "submit #playersRoom .new-message": function (event) {
        event.preventDefault();
        var content = event.target.content.value;
        if (!content.isEmpty()) {
            Meteor.call("addPlayersRoomMessage", {content: content});
        }
        event.target.content.value = "";
    },
    /*
     Delete all messages.
     */
    "submit #playersRoom .clear-messages": function (event) {
        event.preventDefault();
        Meteor.call("clearPlayersRoomMessages");
    }
});

Template.PlayersRoom.onRendered(function() {
    /*
     Auto scroll to bottom of feed at new message.
     */
    playersRoom.scrollToBottom = function() {
        var comments = $('#playersRoom').find('.comments');
        comments.scrollTop(comments.prop("scrollHeight"));
    };
    playersRoom.scrollToBottom();
    PlayersRoomMessagesCollection.find({}).observe({
        added: function(document) {
            playersRoom.scrollToBottom();
        }
    });
});