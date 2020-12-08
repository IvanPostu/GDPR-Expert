document.addEventListener('DOMContentLoaded', function () {
  
  {
    var _organisationId = document.getElementById('_organisationId')
    document.getElementById('organisationsSelectID')
      .addEventListener('change', function(e){
        _organisationId.value = e.target.value
      })
  }

  {
    var _requestedRight = document.getElementById('_requestedRight')
    document.getElementById('rightsSelectID')
      .addEventListener('change', function(e){
        _requestedRight.value = e.target.value
      })
  }
  


  var selectElements = document.querySelectorAll('select');
  M.FormSelect.init(selectElements, { classes: '' });

  var textareaDescription = document.querySelectorAll('textarea#comment');
  M.CharacterCounter.init(textareaDescription);

  var validationErrorModal = document.getElementById('validationErrorModal1');
  if(Boolean(validationErrorModal)){
    var instance = M.Modal.init(validationErrorModal, {
      onCloseEnd: function(){
        instance.destroy()
      }
    });
    instance.open();
  }

});

