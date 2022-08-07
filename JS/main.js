let input = document.querySelector(".get-repos-app header input")
let button = document.querySelector(".get-repos-app header button")
let infoArea = document.querySelector(".get-repos-app footer")





button.onclick = function () {
    getRepos()
}




//function ger repos
function getRepos() {
    if (input.value === "") {
        infoArea.innerHTML = "<span>Please Write Github Username</span>"
    } else if (/\s/ig.test(input.value)) {
        infoArea.innerHTML = "<span>No Trics,, Write Fucking Github Username</span>"
    } else {

        let myRequest = new XMLHttpRequest();
        myRequest.open("GET", `https://api.github.com/users/${input.value}/repos`, true);
        myRequest.send();

        console.log(myRequest)
        
        myRequest.onreadystatechange = function () {
            if(myRequest.readyState === 4 && myRequest.status === 200) {
                let jsonData = myRequest.responseText
                let jsData = JSON.parse(jsonData)

                infoArea.innerHTML = ""
                
                jsData.forEach(repo => {
                    
                    //creat main div
                    let mainDiv = document.createElement("div")
                    mainDiv.classList.add("main")


                    let leftDiv = document.createElement("div")
                    leftDiv.classList.add("lDiv")
                    leftDiv.appendChild(document.createTextNode(repo.name))

                    let rightDiv = document.createElement("div")
                    rightDiv.classList.add("rDiv")


                    let StarsSpan = document.createElement("span")
                    StarsSpan.appendChild(document.createTextNode(`Stars : ${repo.stargazers_count}`))
                    rightDiv.appendChild(StarsSpan)

                    let URL = document.createElement("a")
                    URL.href = `https://github.com/${input.value}/${repo.name} `
                    URL.setAttribute("target", "_blank")
                    URL.appendChild(document.createTextNode("Visit"))
                    rightDiv.appendChild(URL)


                    mainDiv.appendChild(leftDiv)
                    mainDiv.appendChild(rightDiv)
                    infoArea.appendChild(mainDiv)
                });
            } else {
                infoArea.innerHTML = "<span>Username is Rong</span>"
            }
        }
    }
}