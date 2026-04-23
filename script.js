function showDeveloperInfo(lastName, firstName, role = "Experienced Survivor") {
    console.log("--- Developer Info ---");
    console.log(`Prepared by: ${lastName} ${firstName}`);
    console.log(`Role: ${role}`);
}

function compareMonsterDanger(monster1, monster2) {
    if (monster1.length >= monster2.length) {
        alert("CRITICAL THREAT: " + monster1.toUpperCase());
    } else {
        alert("CRITICAL THREAT: " + monster2.toUpperCase());
    }
}

function startSurvivalDialogue() {
    let character = prompt("Which survivor are you playing as?", "Wilson");
    
    if (character) {
        let isReady = confirm(`${character}, are you prepared for the coming winter?`);
        
        if (isReady) {
            alert("Good. Keep your thermal stone warm!");
        } else {
            let resources = ["Flint", "Twigs", "Grass", "Log"];
            let warning = "You must gather these immediately:";
            
            for (let i = 0; i < resources.length; i++) {
                warning += `\n- ${resources[i]}`;
            }
            alert(warning);
        }
    }
}

function activateNightCycle() {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#1a1a2e";
    document.body.style.transition = "background-color 2s"; 

    setTimeout(() => {
        document.body.style.backgroundColor = originalBg;
    }, 3000); 
}

function handler1() {
const logo = document.getElementById("main-title-logo");
    if (logo) {
        logo.style.textShadow = "0 0 20px #8b0000, 0 0 30px red";
        logo.style.transition = "text-shadow 0.3s";
        
        setTimeout(() => {
            logo.style.textShadow = "2px 2px 4px rgba(0,0,0,0.2)";
        }, 400);
    }
}

function handler2() {
    const logo = document.getElementById("main-title-logo");
    if (logo) {
        logo.style.letterSpacing = logo.style.letterSpacing === "10px" ? "3px" : "10px";
    }
}

const LogoManager = {
    handleEvent(event) {
        if (event.type === 'click') {
            const element = event.currentTarget;
            
            element.style.borderBottom = "3px solid red";
            
            setTimeout(() => {
                element.style.borderBottom = "none"; 
            }, 1500);
        }
    }
};

function disableLogoClick() {
    const logo = document.getElementById("main-title-logo");
    logo.removeEventListener('click', LogoManager);
    alert("Delete one click");
}

const actionMethods = {
    save() { 
        localStorage.setItem('isLogoClickPermanentlyDisabled', 'true');
        alert("Save delete one click");
     },
    restart() { if(confirm("Restart?")) location.reload(); },
    help() { alert("Tip: Find flint as soon as possible!"); }
};

window.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById("main-title-logo");

    if (logo) {
        const isPermanentlyDisabled = localStorage.getItem('isLogoClickPermanentlyDisabled');

        if (isPermanentlyDisabled !== 'true') {
            logo.addEventListener('click', LogoManager);
        }

        logo.onmouseenter = () => logo.style.color = "#8b0000";
        logo.onmouseleave = () => logo.style.color = "#2f4f4f";

        logo.addEventListener('dblclick', handler1);
        logo.addEventListener('dblclick', handler2);
    }

    const goalList = document.querySelector("ul");
    if (goalList) {
        goalList.addEventListener('click', (event) => {
            let li = event.target.closest('li');
            if (!li || !goalList.contains(li)) return;

            goalList.querySelectorAll('li').forEach(el => el.style.backgroundColor = "");
            li.style.backgroundColor = "rgba(255, 215, 0, 0.4)";
        });
    }

    document.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        if (action && actionMethods[action]) {
            actionMethods[action]();
        }
        
        if (event.target.dataset.behavior === 'toggle-night') {
            document.body.style.filter = document.body.style.filter === 'brightness(0.6)' ? 'none' : 'brightness(0.6)';
        }
    });
});