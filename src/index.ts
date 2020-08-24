import { addToHistory } from "./add-history";
import { runFastDotCom } from "./run-browser";
import { BehaviorSubject } from "rxjs";
import { ISpeedResult } from './models';

try {

    const TOO_LONG = 222;
    let counter = 0;

    const speedSub = new BehaviorSubject<ISpeedResult>({} as any);

    runFastDotCom(speedSub);

    speedSub.subscribe((speedResult) => {

        counter += 1;

        console.log('counter: ', counter, 'speedResult.speed: ', speedResult.speed);

        if (counter > TOO_LONG) {
            process.exit();
        }

        if (speedResult.isDone) {
            addToHistory(speedResult);
            speedSub.unsubscribe();
        }

    });

} catch (e) {
    console.error('Error:', e.stack);
}