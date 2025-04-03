var permissionsToRemove = [ "READ_MEDIA_IMAGES", "READ_MEDIA_VIDEO"];

const fs = require('fs');
const path = require('path');
const rootdir = "";
const manifestFile = path.join(rootdir, "platforms/android/app/src/main/AndroidManifest.xml");

fs.readFile( manifestFile, "utf8", function( err, data )
{
    if (err)
        return console.log( err );

    let result = data;
    for (var i=0; i<permissionsToRemove.length; i++){
        const regex = new RegExp(`<uses-permission[^>]*android:name=["']${permissionsToRemove[i]}["'][^>]*/?>`, 'gi');
        if (regex.test(result)) {
            result = result.replace(regex, '');
        }
    }

    fs.writeFile( manifestFile, result, "utf8", function( err )
    {
        if (err)
            return console.log( err );
    } );
} );