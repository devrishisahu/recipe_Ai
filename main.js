const display = document.querySelector('#display')
const addItem = document.querySelector('#addItem')
const cookForm = document.querySelector('#cookForm')
const addItemForm = document.querySelector('#addItemForm')
const cookBtn = document.querySelector('#cookBtn')
const addItemBtn = document.querySelector('#addItemBtn')
const deleteBtn = document.querySelector('#deleteBtn')
const loadingVideo = document.querySelector('#loadingVideo')
const recipeResult = document.querySelector('#recipeResult')

const GEMINI_API_KEY = 'AIzaSyDt4Hw8etch2ZuvomrN6Buf8u5Hbbpr_J8';


function appendToDisplay(input) {
    display.value += input;
}

function popOne() {
    // loadingVideo.className = "absolute top-0 left-0 rounded-2xl h-full w-full overflow-hidden hidden "
    loadingVideo.style.display = "none"

    let poping = display.value.split(',')
    let poppedBlank = poping.pop();
    let poppedOne = poping.pop()
    poping.push('')
    display.value = poping

}

function emptyDisplay() {
    display.value = ''
}

const addToDisplay = ((e) => {

    e.preventDefault()

    display.value += addItem.value + ", ";
    addItemForm.reset()
})


const cookFunction = ((eTwo) => {
    eTwo.preventDefault()
    recipeResult.innerText = "Our Miss recipe is cooking something for you .... "
    loadingVideo.style.display = "block"
    generateContent();
    

})



async function generateContent() {
    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": GEMINI_API_KEY,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `i have follwing ingredients ${display.value} suggest me some possible indian recipes which i can make using only these ingredients add the basic spices and some ingredients suggestions by your own and they must be veg and give the recipe data neat and without any '*','#' use the number labelling instead `,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response:", data);
        recipeResult.innerText = data.candidates[0].content.parts[0].text
        loadingVideo.style.display = "none"

    } catch (error) {
        console.error("Error:", error);
    }
}


cookBtn.addEventListener("click", cookFunction)
deleteBtn.addEventListener("dblclick", emptyDisplay)
addItemBtn.addEventListener("click", addToDisplay)
