import {settings} from "./settings";
import {Player} from "./Player";



const monsterGame = {
    updateCard(i) {
        this.cardElements[i].querySelector(settings.labelSelector).textContent = settings.remainingLifeMessage(this.players[i].health); //modofier du js avec des elemnts html
        this.cardElements[i].querySelector(settings.progressSelector).value = this.players[i].health;
    }, displayLogs(name, i, damage) {
        this.logElement.insertAdjacentHTML('beforeend', settings.actions[name].message(this.players[i], damage));
    }, play(name) {
        let gameOverName = null;
        for (let i = 0; i < this.players.length; i++) {
            const damage = Math.floor(Math.random() * settings.actions[name].max_impact);/*generer apres chaque clique un nouveuax score*/
            this.players[i].health += damage;
            console.log(this.players[i])
            this.updateCard(i);
            this.displayLogs(name, i, damage);
            if (this.players[i].health <= 0) {
              gameOverName = this.players[i].name
            }
        }
        if (gameOverName) {
            this.lostGame(gameOverName);
        }
    }, start(e) {
        this.players = [new Player(settings.defaultPlayerName1), new Player(settings.defaultPlayerName2)];
        this.changePlayerName(e);
        this.logElement.innerHTML = " ";
        for (let i = 0; i < this.players.length; i++) {
            this.updateCard(i);
        }

    }, addEvenlisterns() {

        for (const actionsButton of this.actionsButtons) {
            actionsButton.addEventListener('click', (evt) => {
                if (evt.currentTarget.dataset.name === 'give-up'){
                    // TODO :
                    console.log("Give-up");

                    if (this.players[0].health < this.players[1].health) {
                        this.lostGame(this.players[0].name);
                    }else {
                        this.lostGame(this.players[1].name);

                    }



                }else {
                this.play(evt.currentTarget.dataset.name);
                }
            });
        }


    this.formElement.addEventListener('submit', (e) => {
        this.start(e);


    });
},

    hideFormAndShowControls(e) {
        e.currentTarget.classList.add(settings.hideElementClass);
        this.controlElement.classList.remove(settings.hideElementClass);
    }, changePlayerName(e) {
        e.preventDefault();//empechez le comportement par default de la page ceci empeche le navigateur de recharger la page
        this.players[0].name = e.currentTarget.querySelector('input').value;/*represente le form et on clible le input du form */
        this.labelPlayerElement.textContent = this.players[0].name;
        this.hideFormAndShowControls(e);
    }, init(){
        console.log('Bonjour tout le monde ! ');
        this.players = [new Player(settings.defaultPlayerName1), new Player(settings.defaultPlayerName2)];
        this.formElement = document.getElementById(settings.playGameFormId);
        this.labelPlayerElement = document.getElementById(settings.playerNameId);
        this.controlElement = document.querySelector(settings.controlDivSelector);
        this.actionsButtons = document.querySelectorAll(settings.actionsSelector);
        this.cardElements = document.querySelectorAll(settings.playersContainerSelector);
        this.logElement = document.querySelector(settings.logContainerSelector);



        this.addEvenlisterns();

    },
    lostGame(name) {
        this.formElement.classList.remove(settings.hideElementClass);
        this.controlElement.classList.add(settings.hideElementClass);
        this.logElement.insertAdjacentHTML('beforeend', settings.lost_message(name));
    }
}
monsterGame.init();