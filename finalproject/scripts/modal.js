function activateButtons(){

const buttons=

document.querySelectorAll(".details");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const id=

Number(button.dataset.id);

const course=

allCourses.find(

c=>c.id===id

);

showDialog(course);

});

});

}
function showDialog(course){

dialogContent.innerHTML=`

<h2>${course.title}</h2>

<p>

<strong>Category:</strong>

${course.category}

</p>

<p>

<strong>Level:</strong>

${course.level}

</p>

<p>

<strong>Duration:</strong>

${course.duration}

</p>

<p>

${course.description}

</p>

`;

dialog.showModal();

}
close.addEventListener("click",()=>{

dialog.close();

});