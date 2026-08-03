export async function getCourses() {

    try {

        const response = await fetch("data/courses.json");

        if (!response.ok) {
            throw new Error("Unable to load courses.");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return [];

    }

}