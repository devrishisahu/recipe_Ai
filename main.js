const display = document.querySelector('#display')
const addItem = document.querySelector('#addItem')
const cookForm = document.querySelector('#cookForm')
const addItemForm = document.querySelector('#addItemForm')
const cookBtn = document.querySelector('#cookBtn')
const addItemBtn = document.querySelector('#addItemBtn')
const deleteBtn = document.querySelector('#deleteBtn')
const loadingVideo = document.querySelector('#loadingVideo')
const recipeResult = document.querySelector('#recipeResult')
const toggleCheck = document.querySelector('#toggleCheck')
const toggle = document.querySelector('#toggle')
const vegItemOne = document.querySelector('#vegItemOne')
const vegItemTwo = document.querySelector('#vegItemTwo')
const vegItemThree = document.querySelector('#vegItemThree')
const nonVegItemOne = document.querySelector('#nonVegItemOne')
const nonVegItemTwo = document.querySelector('#nonVegItemTwo')
const nonVegItemThree = document.querySelector('#nonVegItemThree')
let preference

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
    console.log(toggleCheck.value)
    console.log(toggle.value)
    display.value = ''
}


const addToDisplay = ((e) => {

    e.preventDefault()

    display.value += addItem.value + ", ";
    addItemForm.reset()
})

function isCheacked() {

    if (toggleCheck.checked) {
        let preference = "non-veg"
        console.log(preference)

        vegItemOne.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black hidden"
        vegItemTwo.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black hidden"
        vegItemThree.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black hidden"
        nonVegItemOne.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black"
        nonVegItemTwo.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black"
        nonVegItemThree.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black"


    } else {
        let preference = "veg"
        console.log(preference)
        vegItemOne.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black "
        vegItemTwo.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black "
        vegItemThree.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black "
        nonVegItemOne.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black hidden "
        nonVegItemTwo.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black hidden "
        nonVegItemThree.className = "bg-[#121f1f] rounded-4xl h-10 border border-[#2e3e3e] hover:bg-[#2e3e3b] text-white active:bg-white active:text-black hidden "

    }

}


const cookFunction = ((eTwo) => {
    eTwo.preventDefault()
    recipeResult.innerText = "Our Miss recipe is cooking something for you .... "
    loadingVideo.style.display = "block"
    generateContent();


})

async function generateContent() {

    let preference
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
                                    text: `i have follwing ingredients ${display.value} suggest me some possible indian recipes which i can make using only these ingredients add the basic spices and some ingredients suggestions by your own and they must be ${preference} and give the recipe data neat and without any '*','#' use the number labelling instead `,
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
