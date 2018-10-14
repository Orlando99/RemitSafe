
//  Create a Vendor or Buyer through admin
//************ These Arent Working for some Reason *******************
$("#createVenBuyButton").on("click", function () {
    // $("#createFormHide").removeAttr("display");
    // $(document).getElementById("createFormHide").style.display = "block";
});

$("#editVenBuy").on("click", function () {
    console.log("hello");
});

$("#deleteVenBuy").on("click", function () {

});
//*********************************************************************

function createBut() {
    $("#createFormHide").show();
    console.log("hello");
}

$("#submitCreateNew").on("click", function () {
    $("#createFormHide").hide();
});

function submitCreateNewFunc() {
    $("#createFormHide").hide();
}

//*********** Should I dynamically alter the page with checkbox's to select which vendor/buyer or have the 'edit' and
//*********** 'delete' buttons dynamivally pop up upon checkbox (transitions)
//  Edit a Vendor or Buyer information
function editVenBut() {
    console.log("hello");

}
//  Delete a Vendor or Buyer Information
function deleteVenBut() {
    console.log("hello");

}
//********************************************************************************************************************






