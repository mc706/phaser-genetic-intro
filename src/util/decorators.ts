export function logMethod(target: any, key: any, descriptor:any): any {

    // save a reference to the original method this way we keep the values currently in the
    // descriptor and don't overwrite what another decorator might have done to the descriptor.
    if(descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    let originalMethod = descriptor.value;

    //editing the descriptor/value parameter
    descriptor.value = function () {
        let args = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        let a = args.map(function (a) { return JSON.stringify(a); }).join();
        // note usage of originalMethod here
        let result = originalMethod.apply(this, args);
        let r = JSON.stringify(result);
        console.log("Call: " + key + "(" + a + ") => " + r);
        return result;
    };

    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
}
