function showDeletePopUp(id){
    var modalRemove = document.getElementById("modal-remove");
    modalRemove.classList.remove("hidden");
    var yesButton = document.getElementById("yesButton");
    yesButton.onclick = (function() {
        removeProduct(id);
        modalRemove.classList.add("hidden");
        showOkRemovedPopUp();
    });
    var cancelButton = document.getElementById("cancelButton");
    cancelButton.onclick = (function() {
        modalRemove.classList.add("hidden");
    });

}
function showOkRemovedPopUp(){
    var modalRemoved = document.getElementById("modal-removed");
    modalRemoved.classList.remove("hidden");
    var okButton = document.getElementById("okButton");
    okButton.onclick = (function() {
        modalRemoved.classList.add("hidden");
    });
    
}
function showUpdatePopUp(id){
    var modalUpdate = document.getElementById("modal-update");
    modalUpdate.classList.remove("hidden");
    var yesButtonUpdate = document.getElementById("yesButtonUpdate");
    yesButtonUpdate.onclick = (function() {
        modifyProduct(id);
        modalUpdate.classList.add("hidden");
        showOkUpdatedPopUp();
    });
    var cancelButtonUpdate = document.getElementById("cancelButtonUpdate");
    cancelButtonUpdate.onclick = (function() {
        modalUpdate.classList.add("hidden");
    });

}
function showOkUpdatedPopUp(){
    var modalUpdated = document.getElementById("modal-updated");
    modalUpdated.classList.remove("hidden");
    var okButtonUpdated = document.getElementById("okButtonUpdated");
    okButtonUpdated.onclick = (function() {
        modalUpdated.classList.add("hidden");
    });
    
}