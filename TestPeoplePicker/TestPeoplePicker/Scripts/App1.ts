///<reference path="typings/sharepoint/SharePoint.d.ts" />
///<reference path="typings/jquery/jquery.d.ts" />

module App1 {
    var queryString = parseQueryString();
    var isIframe = queryString['DisplayMode'] == 'iframe'
    var spHostUrl = queryString['SPHostUrl'];
    var editmode = Number(queryString['editmode']);
    var includeDetails = queryString['boolProp'] == 'true';

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


    function parseQueryString() {
        var result = {};
        var qs = document.location.search.split('?')[1];
        if (qs) {
            var parts = qs.split('&');
            for (var i = 0; i < parts.length; i++) {
                if (parts[i]) {
                    var pair = parts[i].split('=');
                    result[pair[0]] = decodeURIComponent(pair[1]);
                }
            }
        }
        return result;
    }
}


