import * as fs from "fs";
import history from '../speedtest-history.json'
import { ISpeedResult } from "./models";

export function addToHistory(speedNow: ISpeedResult) {

    history.push(speedNow);

    const newItem = JSON.stringify(history, null, '\t');

    fs.writeFile("./speedtest-history.json", newItem, (err) => {
        if (err) {
            console.error(err);
        }

    });

}