let btnShowRandom = document.getElementById("button-random-dog");
let content = document.getElementById("content");
let btnShowBreed = document.getElementById("button-show-breed");
let dogBreed = document.getElementById("input-breed");
let btnSubBreed = document.getElementById("button-show-sub-breed");
let btnAllBreed = document.getElementById("button-show-all");

let newImage = document.createElement("img");
let par = document.createElement("p");
let list = document.createElement("ol");

btnShowRandom.addEventListener("click", () => getDogInfo("https://dog.ceo/api/breeds/image/random", 0));
btnShowBreed.addEventListener("click", (event) => {
    let breed = dogBreed.value.toLowerCase();
    getDogInfo(`https://dog.ceo/api/breed/${breed}/images/random`, 1);
    event.preventDefault();
});
btnSubBreed.addEventListener("click", (event) => {
    let breed = dogBreed.value.toLowerCase();
    getDogInfo(`https://dog.ceo/api/breed/${breed}/list`, 2);
    event.preventDefault();
});
btnAllBreed.addEventListener("click", () => getDogInfo("https://dog.ceo/api/breeds/list/all", 3));

function display(data, option) {
    par.remove();
    newImage.remove();
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    list.remove();
    switch (option) {
        case 1:
            if (data.message === "Breed not found (master breed does not exist)") {
                par.textContent = "Breed not found!";
                content.append(par);
            } else {
                newImage.src = data.message;
                content.prepend(newImage);
            }
            break;
        case 2:
            if (data.message === "Breed not found (master breed does not exist)") {
                par.textContent = "Breed not found!";
                content.append(par);
            } else {
                let subBreed = Object.values(data.message);
                if (subBreed.length === 0) {
                    par.textContent = "No sub-breeds found!";
                    content.append(par);
                } else {
                    subBreed.forEach((item) => {
                        let subItem = document.createElement("li");
                        subItem.textContent = item.toString();
                        list.append(subItem);
                    });
                    content.append(list);
                }
            }
            break;
        case 3:
            let all = Object.entries(data.message);
            for (let key in all) {
                let orderLi = document.createElement("li");
                orderLi.textContent = all[key][0];
                list.append(orderLi);

                if (all[key][1].length > 0) {
                    let subList = document.createElement("ul");
                    let unorderedLi = document.createElement("li");
                    unorderedLi.textContent = all[key][1].join();
                    subList.append(unorderedLi);
                    orderLi.append(subList);
                }
            }
            content.append(list);
            break;
        default:
            newImage.src = data.message;
            content.prepend(newImage);
            break;
    }
}

async function getDogInfo(api, option) {
    try {
        const response = await fetch(api);
        const data = await response.json();
        display(data, option);
    } catch (error) {
        console.log(error);
    }
}
