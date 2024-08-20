const listItemTailwindClassesString =
  "flex flex-row justify-between items-center min-w-[200px] bg-emerald-300 rounded-md mx-[20vw] px-5 py-6 text-emerald-950 text-3xl";
const listItemClassList = listItemTailwindClassesString.split(" ");

let submitButton = document.getElementById("submit-button");
let listNameInputBox = document.getElementById("list-name-input");
let itemList = document.getElementById("item-list");
let clearButton = document.getElementById("clear-button");
// console.log(listNameInputBox);
// console.log(itemList.children);
// console.log(itemList.children[0]);
function createXIcon() {
  //Could not find out how to dynamically render svgs, so this will have to do
  let icon = document.createElement("button");
  icon.classList.add("text-red-500");
  icon.classList.add("font:bold");
  iconCharacter = document.createTextNode("x");
  icon.appendChild(iconCharacter);
  icon.classList.add("flex", "justify-center", "content-center");
  return icon;
}
function createAndAddListItemToListInDom(listItemName) {
  console.log("The name of the soon to be list item is: " + listItemName);
  newListItem = document.createElement("LI");
  listItemClassList.forEach((tailWindClassName) => {
    newListItem.classList.add(tailWindClassName);
  });
  //I really need to learn best conventions for this
  let listItemNameParagraph = document.createElement("p");
  listItemNameParagraph.appendChild(document.createTextNode(listItemName));
  listItemNameParagraph.classList.add("justify-center");

  let svgIcon = createXIcon();

  newListItem.appendChild(listItemNameParagraph);
  newListItem.appendChild(svgIcon);
  itemList.appendChild(newListItem);
}
function removeListItemFromDom(listItem) {
  listItem.remove();
}

function getParentListItem(clickedElement) {
  clickedItemParent = clickedElement.parentElement;
  console.log(clickedItemParent.tagName);
  if (clickedItemParent.tagName == "LI") {
    return clickedItemParent;
  } else if (clickedItemParent.tagName == "HTML") {
    console.log(
      "Recursive function failed to find a parent that is a list item",
    );
    return;
  } else {
    return getParentListItem(clickedItemParent);
  }
}

function handleListModification(event) {
  // console.log(event);
  // console.log(event.target);
  // console.log(event.currentTarget);
  // console.log(event.target.getAttribute("innerHTML"));
  // console.log(event.target.tagName);
  clickedElement = event.target;
  clickedElementName = clickedElement.tagName;
  console.log(clickedElementName);
  console.log(getParentListItem(clickedElement));
  if (clickedElementName == "BUTTON") {
    removeListItemFromDom(getParentListItem(clickedElement));
    //removeListItemFromLocalStorage
  }
}
function getListItemSubmissionNameFromInput(submittedListItemName) {
  if (submittedListItemName === " " || submittedListItemName === "") {
    return;
  }
  //Format the name
  submittedListItemName =
    submittedListItemName[0].toUpperCase() +
    submittedListItemName.slice(1).toLowerCase();
  submittedListItemNameArray = submittedListItemName
    .split("")
    .filter((character) => {
      // console.log(character);
      if (character !== " ") {
        return true;
      }
      return false;
    });
  submittedListItemName = submittedListItemNameArray.join("");
  //Check for duplicates
  currentListItemNodeList = document.querySelectorAll("li");
  currentListItemNodeList.forEach((item) => {
    // console.log(item.childNodes);
    let itemParagraphName = item.querySelectorAll("p")[0].innerHTML;
    console.log(itemParagraphName);
    /*
      item.firstChild.nextSibling.textContent;
      item.firstChild.nextSibling.innerHTML;
      item.textContent.trim();
      all work
    */
    if (itemParagraphName === submittedListItemName) {
      submittedListItemName = null;
    }
  });
  return submittedListItemName;
}
function handleNewListItemSubmission() {
  let newListItemName = getListItemSubmissionNameFromInput(
    listNameInputBox.value,
  );
  if (newListItemName == null) {
    alert("The name is a duplicate or invalid");
    return;
  }
  console.log("The name: " + newListItemName);
  createAndAddListItemToListInDom(newListItemName);
  listNameInputBox.value = "";
  console.log(clearButton.display);
  console.log(itemList.firstChild);
}
function handleClear() {
  while (itemList.firstChild != null) {
    removeListItemFromDom(itemList.firstChild);
  }
}
itemList.addEventListener("click", handleListModification);
submitButton.addEventListener("click", handleNewListItemSubmission);
clearButton.addEventListener("click", handleClear);
//Find out how to create li
//Find out how to insert li into nodelist
//Find out how to delete li from nodelist
//Persistant Storage
