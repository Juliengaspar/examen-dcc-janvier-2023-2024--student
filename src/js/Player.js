import {settings} from "./settings";

export class Player {
name;
    constructor(name) {
        this.name = name;
        this.health = settings.healthMaxValue;
    }
}