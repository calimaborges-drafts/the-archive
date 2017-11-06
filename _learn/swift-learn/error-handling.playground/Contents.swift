enum PrinterError: ErrorType {
    case OutOfPaper, NoToner, OnFire
}

func sendToPrinter(printerName: String) throws -> String {
    if printerName == "Never Has Toner" {
        throw PrinterError.NoToner
    }
    
    if printerName == "Always On Fire" {
        throw PrinterError.OnFire
    }
    
    return "Job sent"
}


do {
//    let printerResponse = try sendToPrinter("Bi Sheng")
    let printerResponse = try sendToPrinter("Never Has Toner")
    print(printerResponse)
} catch {
    print(error)
}


do {
//    let printerResponse = try sendToPrinter("Gutenberg")
    let printerResponse = try sendToPrinter("Always On Fire")
    print(printerResponse)
} catch PrinterError.OnFire {
    print("I'll just put this over here, with the rest of the fire.")
} catch let printerError as PrinterError {
    print("Printer error: \(printerError).")
} catch {
    print(error)
}


let printerSuccess = try? sendToPrinter("Mergenthaler")
let printerFailure = try? sendToPrinter("Never Has Toner")


var fridgeIsOpen = false
let fridgeContent = ["milk", "eggs", "leftovers"]

func fridgeContains(itemName: String) -> Bool {
    fridgeIsOpen = true
    
    defer {
        fridgeIsOpen = false
    }
    
    let result = fridgeContent.contains(itemName)
    return result
}
fridgeContains("banana")
print(fridgeIsOpen)
