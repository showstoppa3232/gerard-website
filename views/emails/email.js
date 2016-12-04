module.exports = {
    getHTML: function(data) {
      return '<div><h3>Name: <small>'+data.name+'</small></h3>'
      +'<h3>Email: <small>'+data.email+'</small></h3>'
      +'<h3>Phone: <small>'+data.phone+'</small></h3>'
      +'<h3>Message: <small>'+data.message+'</small></h3></div>';
    }
};
