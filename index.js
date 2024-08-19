const listItemTailwindClassesString =
  "flex flex-row justify-between items-center min-w-[200px] bg-emerald-300 rounded-md mx-[20vw] px-5 py-6 text-emerald-950 text-3xl";
const listItemClassList = listItemTailwindClassesString.split(" ");

/*
<li
    class="flex flex-row justify-between items-center min-w-[200px] bg-emerald-300 rounded-md mx-[20vw] px-5 py-6 text-emerald-950 text-3xl"
>
    <p class="justify-center">Hello</p>
    <svg
        class="flex shrink-0 h-8 w-8 text-red-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
</li>

*/

let submitButton = document.getElementById("submit-button");
let listNameInputBox = document.getElementById("list-name-input");
let itemList = document.getElementById("item-list");

// console.log(listNameInputBox);
// console.log(itemList.children);
// console.log(itemList.children[0]);
function createSvg() {
  svg = document.createElement("svg");
  svg.innerHTML = `<path stroke="none" d="M0 0h24v24H0z" />`;
  svg.innerHTML += `<line x1="18" y1="6" x2="6" y2="18" />`;
  svg.innerHTML += `<line x1="6" y1="6" x2="18" y2="18" />`;
  svg.classList.add("flex", "shrink-0", "h-8", "w-8", "text-red-500");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  //Fill in the rest
  return svg;
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

  let svgIcon = createSvg();

  newListItem.appendChild(listItemNameParagraph);
  newListItem.appendChild(svgIcon);
  itemList.appendChild(newListItem);
}
function removeListItemFromDom(listItem) {
  listItem.remove();
}
function removeListItemFromLocalStorage(listItem) {}
function addListItemToLocalStorage() {}
function clearListItemsInLocalStorage() {}
function addListItemsInLocalStorageToDOM() {}

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
  if (clickedElementName == "svg" || clickedElementName == "line") {
    removeListItemFromDom(getParentListItem(clickedElement));
    //removeListItemFromLocalStorage
  }
}
function getListItemSubmissionNameFromInput(submittedListItemName) {
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
    alert("The name is a duplicate");
    return;
  }
  console.log("The name: " + newListItemName);
  createAndAddListItemToListInDom(newListItemName);
}
itemList.addEventListener("click", handleListModification);
submitButton.addEventListener("click", handleNewListItemSubmission);
//Find out how to create li
//Find out how to insert li into nodelist
//Find out how to delete li from nodelist
//Persistant Storage
