import {Player} from "./Player";
import {settings as s} from "./settings";

const app = {
 init() {
        this.formElement = document.getElementById(s.playGameFormId);
        this.youNameElement = document.getElementById(s.playerNameId);
        this.inputNameElement = document.getElementById('name');
        this.listeButtonElement = document.querySelector(s.controlDivSelector);
        this.allButtonElments = document.querySelectorAll(s.actionsSelector);
        this.ulElement = document.querySelector(s.logContainerSelector);
        this.youProgresseBart = document.getElementById('you-progress');
        this.monsterProgresseBart = document.getElementById('monster-progress');
        this.labelTextPlayerElements= document.querySelectorAll("label");
        this.youName = new Player('toto');
        this.monsterName = new Player('Monster');
        this.namePlayerTable = [this.youName, this.monsterName];
        this.addEvenlistrersSubmitFormElement();
        this.addEventListernsButtonElements();
    },
    losePLayer() {
        this.formElement.classList.remove('visuallyhidden');
        this.listeButtonElement.classList.add(s.hideElementClass);

        if (this.namePlayerTable[0].health > this.namePlayerTable[1].health){
            this.formElement.insertAdjacentHTML('beforeend', s.lost_message(this.namePlayerTable[1].name));
        }else {
            this.formElement.insertAdjacentHTML('beforeend', s.lost_message(this.namePlayerTable[0].name));
        }
    },
    gererAction(actionType, joueur, progresseBarre) {
        const maxImpact = s.actions[actionType].max_impact;//max impact de l'action ;
        const randomDamage = Math.floor(Math.random() * maxImpact);

        this.namePlayerTable[joueur].health = this.namePlayerTable[joueur].health + randomDamage;
        const ActionMessage= s.actions[actionType].message(this.namePlayerTable[joueur], randomDamage);

        this.ulElement.insertAdjacentHTML('beforeend', ActionMessage);

        progresseBarre.value = this.namePlayerTable[joueur].health;

        this.labelTextPlayerElements[joueur].textContent =  this.namePlayerTable[joueur].health + "% de vie restante";

        if (this.namePlayerTable[joueur].health<=0){
            this.losePLayer();
        }

    },
    addEvenlistrersSubmitFormElement() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.namePlayerTable.forEach(namePlayer =>{
                namePlayer.health = s.healthMaxValue;
            });
            for (let i = 0; i < 2; i++) {
                this.labelTextPlayerElements[i].textContent = '100% de vie restante';
            }
            this.youProgresseBart.value = 100;
            this.monsterProgresseBart.value = 100;
            this.ulElement.innerHTML ="";
            this.youNameElement.textContent = this.inputNameElement.value;
            this.namePlayerTable[0].name = this.inputNameElement.value;
            this.formElement.classList.add(s.hideElementClass);
            this.listeButtonElement.classList.remove(s.hideElementClass);
        });
    },
    addEventListernsButtonElements() {
        this.allButtonElments.forEach(allButtonElments => {
            allButtonElments.addEventListener('click', () => {
                //const nameDate = allButtonElments.dataset.name;
                const actionType = allButtonElments.dataset.name; // ou 'special_attack' ou 'heal'
                if (s.actions.hasOwnProperty(actionType)) {//on verifier si il posséder l'action des le settings
                    this.gererAction(actionType, 0, this.youProgresseBart);
                    this.gererAction(actionType, 1, this.monsterProgresseBart);
                } else {
                    this.losePLayer();
                }
            });
        });
    }
}
app.init();