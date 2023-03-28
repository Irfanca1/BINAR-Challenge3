class Component {
    constructor() {
        if (new.target === Component) {
            throw new Error("Cannot instantiate from Abstrcat Class")
        }
    }

    render() {
        throw new Error("Method 'render()' must be implemented.");
    }
}

export default Component;