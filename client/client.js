var ImageStore = new Mongo.Collection('up');

Uploads = new Mongo.Collection('uploads',{
stores : [ImageStore],
 filter: {
    maxSize: 1048576 * 4,
    allow: {
      contentTypes: ['image/jpeg','image/jpg','image/gif','image/png','image/tif'],
    } //in bytes
  }

});

  Meteor.subscribe('uploads');
  
  Template.fileList.helpers({
    theUploads: function () {
      return Uploads.find({}, {sort: {"name": 1}});
    },
    myCallbacks: function () {
      return {
        finished: function (index, fileInfo, context) {
          console.log('This function will execute after each fileupload is finished on the client');
          console.log("index ", index);
          console.log("context ", context);
        }

      }
    }
  });
  Template.fileList.events({
    'click #deleteFileButton ': function (event) {
      Meteor.call('deleteFile', this._id);
    },
    'keyup #d'  :function(event,_id) {
      if(event.which >=48 && event.which <=57){
        var time = event.which -48;
        var time1= time*1000;
        console.log(time1);
       Meteor.call('playthegif',time1,this._id);  
     }

//      modules = [{
//     "id": "xlab_module_3",
//     "name": "Lights",
//     "thumbnail": "/images/modules/lights.jpg"
// }]

   }
  });