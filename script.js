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

    const inventoryContainer = document.getElementById('inventory-container');

    if (inventoryContainer) {
        inventoryContainer.addEventListener('mouseover', (event) => {
            const target = event.target.closest('.inv-item');
            const related = event.relatedTarget;

            if (target && (!related || !target.contains(related))) {
                target.style.backgroundColor = '#d3cec4';
                target.style.transform = 'scale(1.1)';
                target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            }
        });

        inventoryContainer.addEventListener('mouseout', (event) => {
            const target = event.target.closest('.inv-item');
            const related = event.relatedTarget;

            if (target && (!related || !target.contains(related))) {
                target.style.backgroundColor = target.id === 'draggable-log' ? '#8b4513' : '#eadec8';
                target.style.transform = 'scale(1)';
                target.style.boxShadow = 'none';
            }
        });
    }

    const logItem = document.getElementById('draggable-log');
    const campfire = document.getElementById('campfire');

    if (logItem && campfire) {
        let isDragging = false;
        let shiftX, shiftY;

        logItem.addEventListener('mousedown', (event) => {
            if (event.button !== 0) return; 

            isDragging = true;
            const rect = logItem.getBoundingClientRect();
            shiftX = event.clientX - rect.left;
            shiftY = event.clientY - rect.top;

            logItem.style.position = 'absolute';
            logItem.style.zIndex = 1000;
            logItem.style.cursor = 'grabbing';
            
            document.body.append(logItem);
            moveAt(event.pageX, event.pageY);
        });

        function moveAt(pageX, pageY) {
            logItem.style.left = pageX - shiftX + 'px';
            logItem.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            if (!isDragging) return;
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', (event) => {
            if (!isDragging) return;
            isDragging = false;
            logItem.style.cursor = 'grab';

            logItem.hidden = true; 
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            logItem.hidden = false;

            let droppedOnCampfire = elemBelow ? elemBelow.closest('#campfire') : null;

            if (droppedOnCampfire) {
                campfire.style.backgroundColor = '#ff4500';
                campfire.style.boxShadow = '0 0 30px #ff0000, 0 0 60px #ff4500';
                campfire.style.transform = 'scale(1.1)';
                campfire.innerHTML = '🔥 MAXIMUM FLAME!';
                
                setTimeout(() => {
                    campfire.style.backgroundColor = '#2A3439';
                    campfire.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
                    campfire.style.transform = 'scale(1)';
                    campfire.innerHTML = '🔥 Campfire';
                }, 2000);
            }

            resetLogPosition();
        });

        function resetLogPosition() {
            logItem.style.position = 'static';
            logItem.style.zIndex = 'auto';
            if (inventoryContainer) inventoryContainer.append(logItem); 
        }
        
        logItem.ondragstart = () => false;
    }
});