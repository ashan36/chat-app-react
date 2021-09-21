const RoomList = require("./RoomList")

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new RoomList.default(12345)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("createRoom", () => {
    let inst

    beforeEach(() => {
        inst = new RoomList.default(12)
    })

    test("0", () => {
        let callFunction = () => {
            inst.createRoom({ target: { previousSibling: { value: "elio@example.com" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.createRoom({ target: { previousSibling: { value: "Dillenberg" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.createRoom({ target: { previousSibling: { value: "Elio" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.createRoom(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("selectRoom", () => {
    let inst

    beforeEach(() => {
        inst = new RoomList.default("a1969970175")
    })

    test("0", () => {
        let callFunction = () => {
            inst.selectRoom("Investment Account", "Investment Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.selectRoom("Home Loan Account", "Credit Card Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.selectRoom("Investment Account", "Credit Card Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.selectRoom("Credit Card Account", "Checking Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.selectRoom("Investment Account", "Home Loan Account")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.selectRoom(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
