// export function cooldown(fn, cooldownTime) {
//     let lastExecutionTime = 0;

//     return function (...args) {
//         const currentTime = Date.now();
//         if (currentTime - lastExecutionTime >= cooldownTime * 1000) {
//             lastExecutionTime = currentTime;
//             return fn(...args)
//         } else {
//             console.log(`Function is in cooldown. Wait ${cooldownTime} seconds.`)
//         }
//     }
// }


export function cooldown(fn, cooldownTimeInSeconds) {
    let isCooldown = false;

    return function (...args) {
        if (!isCooldown) {
            isCooldown = true;
            fn(...args);
            setTimeout(() => {
                isCooldown = false;
            }, cooldownTimeInSeconds * 1000);
        } else {
            console.log(`Funkcija je u cooldownu. Sačekajte ${cooldownTimeInSeconds} sekundi.`);
        }
    };
}
