search.addEventListener("input",(e)=>{

const value=e.target.value;

saveItem("search",value);

filterCourses(value);

});

function filterCourses(text){

const filtered=

allCourses.filter(course=>

course.title

.toLowerCase()

.includes(

text.toLowerCase()

)

);

displayCourses(filtered);

}