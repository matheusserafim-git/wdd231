import "./menu.js";

import "./theme.js";

import {getCourses}
from "./fetch.js";

import { saveItem, getItem } from "./storage.js";

const container =
document.querySelector("#coursesContainer");

const search =
document.querySelector("#searchInput");

const dialog =
document.querySelector("#courseDialog");

const dialogContent =
document.querySelector("#dialogContent");

const close =
document.querySelector("#closeDialog");

let allCourses=[];

loadCourses();

async function loadCourses(){

allCourses=await getCourses();

displayCourses(allCourses);

const previousSearch = getItem("search");

if(previousSearch){

search.value=previousSearch;

filterCourses(previousSearch);

}

}

function displayCourses(courses){

container.innerHTML="";

courses.forEach(course=>{

const card=document.createElement("article");

card.className="course-card";

card.innerHTML=`

<img
src="${course.image}"
alt="${course.title}"
loading="lazy">

<h3>${course.title}</h3>

<p>${course.category}</p>

<p>${course.level}</p>

<p>${course.duration}</p>

<button
class="details"
data-id="${course.id}">

View Details

</button>

`;

container.appendChild(card);

});

activateButtons();

}

