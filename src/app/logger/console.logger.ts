import {Logger} from "./logger";
import {Pokemon} from "../pokemon";

export class ConsoleLogger implements Logger{
    log(data: unknown): void {
        if(data instanceof Pokemon){
            console.log(`${data.name} : ${data.hp} PV`)
        } else {
            console.log(data);
        }
    }

}