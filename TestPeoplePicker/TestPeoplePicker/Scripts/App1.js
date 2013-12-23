var App1;
(function (App1) {
    m$.ready(function () {
        loadPeoplePicker('peoplePickerDiv');
    });

    //Load the people picker
    function loadPeoplePicker(peoplePickerElementId) {
        var schema = {
            PrincipalAccountType: 'User,DL,SecGroup,SPGroup',
            SearchPrincipalSource: 15,
            ResolvePrincipalSource: 15,
            AllowMultipleValues: true,
            MaximumEntitySuggestions: 50,
            Width: 280,
            OnUserResolvedClientScript: onUserResolvedClientScript
        };

        SPClientPeoplePicker.InitializeStandalonePeoplePicker(peoplePickerElementId, null, schema);
    }

    function onUserResolvedClientScript(el, users) {
        var keys = "";

        // Get information about all users.
        var userInfo = '';
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            keys += user.Key + ",";
            for (var userProperty in user) {
                userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
            }
        }
        $('#resolvedUsers').html(userInfo);

        // Get user keys.
        $('#userKeys').html(keys);
    }
})(App1 || (App1 = {}));
//# sourceMappingURL=App1.js.map
