Uploads = new Mongo.Collection('uploads');

  Meteor.publish("uploads", function () {

    console.log("publishing files");
    var uploads = Uploads.find({});
    console.log("returning " + uploads.fetch().length + " uploads");
    return uploads;
  });

  Meteor.methods({
    'deleteFile': function (_id) {
      check(_id, String);

      var upload = Uploads.findOne(_id);
      if (upload == null) {
        throw new Meteor .Error(404, 'Upload not found'); 
      }
      UploadServer.delete(upload.path);
      Uploads.remove(_id);
    },
    'playthegif': function(time1,_id){
      
      check(_id, String);
      var upload = Uploads.findOne(_id);
      console.log(upload);
      var sys = Npm.require('sys');
      var exec = Npm.require('child_process').exec;
      exec('/Users/anupamakumar/Documents/519_tests/a.out '+ upload.path+ ' '+time1,  function(error,stdout,stderr) 
      {
        sys.print(stdout);
        //sys.print(error);
        //sys.print(stderr);
      });
    }
    });

  Meteor.startup(function () {
    UploadServer.init({
      tmpDir: process.env.PWD + '/Uploads/tmp',
      uploadDir: process.env.PWD + '/Uploads/',
      checkCreateDirectories: true,
      finished: function (fileInfo, formFields) {
        console.log("upload finished, fileInfo ", fileInfo);
        console.log("upload finished, formFields: ", formFields);
        Uploads.insert(fileInfo);
      },
      cacheTime: 100,
      mimeTypes: {
        "xml": "application/xml",
        "vcf": "text/x-vcard"
      },
      validateRequest: function (req, res) {
      }
    })
  });
