module App1 {
    m$.ready(() => {
        loadPeoplePicker('peoplePickerDiv');
    });

    //Load the people picker 
    function loadPeoplePicker(peoplePickerElementId: string) {
        var schema: ISPClientPeoplePickerSchema = {
            PrincipalAccountType: 'User,DL,SecGroup,SPGroup',
            SearchPrincipalSource: 15,
            ResolvePrincipalSource: 15,
            AllowMultipleValues: true,
            MaximumEntitySuggestions :50,
            Width: 280,
            
            OnUserResolvedClientScript: onUserResolvedClientScript
        }

        SPClientPeoplePicker.InitializeStandalonePeoplePicker(peoplePickerElementId, null, schema);
    }

    function onUserResolvedClientScript(el: string, users: ISPClientPeoplePickerEntity[]) {

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
}


