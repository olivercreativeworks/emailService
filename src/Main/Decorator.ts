export function bindClassMethodsToClassInstance(target:any, propertyKey: string, descriptor:PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (...args){
        const classInstance = originalMethod(...args)
        const classMethods = Object.getOwnPropertyNames(target.prototype)
            .filter(isNotAConstructor)
            .filter(isAMethodNameInClassInstance(classInstance)) 
            
        classMethods.forEach(bindMethodToObj(classInstance))
        return classInstance
    }

    function isNotAConstructor(name:string){
        return name != "constructor"
    }
    function isAMethodNameInClassInstance(obj:object){
        return (name:string) => typeof obj[name] == "function"
    }
    function bindMethodToObj(obj:object){
        return (methodName:string) => {
            obj[methodName] = obj[methodName].bind(obj)
        }
    }
}