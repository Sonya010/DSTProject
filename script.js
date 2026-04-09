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
    }, 30000); 
}